import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
  Node,
  NodeTypes,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Heading, Text } from '../ui/typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  FiLayout as Layout,
  FiUsers as Users,
  FiSettings as Settings,
  FiActivity as Activity,
  FiBarChart as BarChart,
  FiCalendar as Calendar,
  FiBell as Bell,
  FiMail as Mail,
  FiPlus as Plus,
  FiTrash2 as Trash,
  FiEdit2 as Edit
} from "react-icons/fi";
import { defaultSiteStructure } from './defaultSiteStructure';

// Navigation sections
const navigation = [
  {
    name: "Overview",
    href: "/sitemap",
    icon: Layout,
  },
  {
    name: "Editor",
    href: "/sitemap/editor",
    icon: Activity,
  },
  {
    name: "Generator",
    href: "/sitemap/generator",
    icon: BarChart,
  }
];

const sections = [
  {
    title: "Notifications",
    items: [
      {
        name: "Messages",
        href: "#",
        icon: Mail,
      },
      {
        name: "Alerts",
        href: "#",
        icon: Bell,
      }
    ]
  }
];

// Define custom node component for sitemap nodes
const SiteMapNode = ({ data }: { data: any }) => {
  return (
    <div className={`p-3 rounded-md shadow-md min-w-[150px] ${data.isHighlighted ? 'bg-amber-100 border-amber-500 border-2' : 'bg-white border border-gray-200'}`}>
      <div className="font-medium text-sm mb-1">{data.label}</div>
      {data.path && (
        <div className="text-xs text-gray-500">{data.path}</div>
      )}
    </div>
  );
};

// Define custom node types
const nodeTypes: NodeTypes = {
  siteNode: SiteMapNode
};

interface SiteNode {
  name: string;
  path?: string;
  children?: SiteNode[];
}

interface SiteStructure {
  name: string;
  path: string;
  children: SiteNode[];
}

// Convert site structure to React Flow nodes and edges
const siteStructureToFlow = (structure: SiteStructure) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // Create root node
  nodes.push({
    id: 'root',
    type: 'siteNode',
    data: { 
      label: structure.name,
      path: structure.path,
      isHighlighted: false
    },
    position: { x: 0, y: 0 }
  });

  // Process each category
  structure.children.forEach((category, categoryIndex) => {
    const categoryId = `category-${categoryIndex}`;
    const angle = (categoryIndex / structure.children.length) * 2 * Math.PI;
    const radius = 250;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Create category node
    nodes.push({
      id: categoryId,
      type: 'siteNode',
      data: { 
        label: category.name,
        isHighlighted: false
      },
      position: { x, y }
    });
    
    // Create edge from root to category
    edges.push({
      id: `edge-root-${categoryId}`,
      source: 'root',
      target: categoryId,
      animated: false
    });
    
    // Process each page in this category
    if (category.children) {
      category.children.forEach((page, pageIndex) => {
        const pageId = `page-${categoryIndex}-${pageIndex}`;
        const pageAngle = angle + (pageIndex - (category.children!.length - 1) / 2) * 0.3;
        const pageRadius = 400;
        const pageX = Math.cos(pageAngle) * pageRadius;
        const pageY = Math.sin(pageAngle) * pageRadius;
        
        // Create page node
        nodes.push({
          id: pageId,
          type: 'siteNode',
          data: { 
            label: page.name,
            path: page.path,
            isHighlighted: page.path === '/brands/workhorse'
          },
          position: { x: pageX, y: pageY }
        });
        
        // Create edge from category to page
        edges.push({
          id: `edge-${categoryId}-${pageId}`,
          source: categoryId,
          target: pageId,
          animated: false
        });
      });
    }
  });
  
  return { nodes, edges };
};

// Convert React Flow nodes and edges back to site structure
const flowToSiteStructure = (nodes: Node[], edges: Edge[]): SiteStructure => {
  // Find the root node
  const rootNode = nodes.find(node => node.id === 'root');
  if (!rootNode) throw new Error('Root node not found');
  
  // Create the base structure
  const structure: SiteStructure = {
    name: rootNode.data.label,
    path: rootNode.data.path || '/',
    children: []
  };
  
  // Find all direct children of root (categories)
  const rootEdges = edges.filter(edge => edge.source === 'root');
  
  rootEdges.forEach(rootEdge => {
    const categoryNode = nodes.find(node => node.id === rootEdge.target);
    if (!categoryNode) return;
    
    const category: SiteNode = {
      name: categoryNode.data.label,
      children: []
    };
    
    // Find all children of this category
    const categoryEdges = edges.filter(edge => edge.source === categoryNode.id);
    
    categoryEdges.forEach(categoryEdge => {
      const pageNode = nodes.find(node => node.id === categoryEdge.target);
      if (!pageNode) return;
      
      // Add page to category children
      category.children!.push({
        name: pageNode.data.label,
        path: pageNode.data.path
      });
    });
    
    // Add category to structure
    structure.children.push(category);
  });
  
  return structure;
};

export default function ReactFlowSitemapEditor() {
  // Load initial nodes and edges from the default site structure
  const initialFlow = siteStructureToFlow(defaultSiteStructure);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlow.edges);
  const [siteStructure, setSiteStructure] = useState<SiteStructure>(defaultSiteStructure);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodePath, setNewNodePath] = useState('');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, animated: false }, eds)),
    [setEdges]
  );

  // Update the site structure when nodes or edges change
  useEffect(() => {
    try {
      const newStructure = flowToSiteStructure(nodes, edges);
      setSiteStructure(newStructure);
    } catch (error) {
      console.error('Error converting flow to site structure:', error);
    }
  }, [nodes, edges]);

  // Handle adding a new category
  const addCategory = () => {
    const newCategoryId = `category-${nodes.length}`;
    const newPosition = { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 };
    
    // Add new category node
    setNodes((nds) => [
      ...nds,
      {
        id: newCategoryId,
        type: 'siteNode',
        data: { label: 'New Category', isHighlighted: false },
        position: newPosition
      }
    ]);
    
    // Add edge from root to new category
    setEdges((eds) => [
      ...eds,
      {
        id: `edge-root-${newCategoryId}`,
        source: 'root',
        target: newCategoryId,
        animated: false
      }
    ]);
  };

  // Handle adding a new page to a category
  const addPage = (categoryId: string) => {
    const categoryIndex = parseInt(categoryId.split('-')[1]);
    const pageCount = nodes.filter(node => node.id.startsWith(`page-${categoryIndex}`)).length;
    const newPageId = `page-${categoryIndex}-${pageCount}`;
    
    // Find the category node to position the new page relative to it
    const categoryNode = nodes.find(node => node.id === categoryId);
    if (!categoryNode) return;
    
    const offset = { x: Math.random() * 150 - 75, y: 150 };
    const newPosition = { 
      x: categoryNode.position.x + offset.x, 
      y: categoryNode.position.y + offset.y 
    };
    
    // Add new page node
    setNodes((nds) => [
      ...nds,
      {
        id: newPageId,
        type: 'siteNode',
        data: { label: 'New Page', path: '/new-page', isHighlighted: false },
        position: newPosition
      }
    ]);
    
    // Add edge from category to new page
    setEdges((eds) => [
      ...eds,
      {
        id: `edge-${categoryId}-${newPageId}`,
        source: categoryId,
        target: newPageId,
        animated: false
      }
    ]);
  };

  // Save the current site structure to localStorage
  const saveSiteStructure = () => {
    localStorage.setItem('workhorse_sitemap', JSON.stringify(siteStructure));
    alert('Sitemap saved to localStorage');
  };

  // Export the current site structure as a JSON file
  const exportSiteStructure = () => {
    const dataStr = JSON.stringify(siteStructure, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'workhorse-sitemap.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import a site structure from a JSON file
  const importSiteStructure = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedStructure = JSON.parse(e.target?.result as string);
        setSiteStructure(importedStructure);
        
        // Convert to nodes and edges
        const { nodes: newNodes, edges: newEdges } = siteStructureToFlow(importedStructure);
        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error('Error importing site structure:', error);
        alert('Error importing site structure. Please make sure the file contains valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Create a hidden file input for importing
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  const addNode = () => {
    if (!newNodeName.trim()) return;

    const newNode: Node = {
      id: Date.now().toString(),
      data: { label: newNodeName },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setNewNodeName('');
  };

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const updateNode = () => {
    if (!selectedNode || !newNodeName.trim()) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: { ...node.data, label: newNodeName },
          };
        }
        return node;
      })
    );

    setSelectedNode(null);
    setNewNodeName('');
  };

  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" size="h1">Interactive Sitemap</Heading>
              <Text className="text-muted-foreground">Create and edit your site structure visually</Text>
            </div>
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Visual Editor</CardTitle>
              <CardDescription>Drag and drop to organize your site structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onNodeClick={(_, node) => setSelectedNode(node)}
                  fitView
                >
                  <Background />
                  <Controls />
                </ReactFlow>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Node name"
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                  />
                  <Input
                    placeholder="Node path"
                    value={newNodePath}
                    onChange={(e) => setNewNodePath(e.target.value)}
                  />
                  {selectedNode ? (
                    <Button onClick={updateNode}>
                      <Edit className="mr-2 h-4 w-4" />
                      Update Node
                    </Button>
                  ) : (
                    <Button onClick={addNode}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Node
                    </Button>
                  )}
                  {selectedNode && (
                    <Button
                      variant="destructive"
                      onClick={() => deleteNode(selectedNode.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Node
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
} 