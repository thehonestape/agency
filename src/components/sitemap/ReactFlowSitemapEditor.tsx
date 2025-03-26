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
import { BrandHeading } from '../brand/BrandHeading';
import { BrandText } from '../brand/BrandText';
import { BrandCard, CardContent, CardHeader, CardTitle } from '../brand/BrandCard';
import { BrandStyledButton } from '../brand/BrandStyledButton';
import { BrandContainer } from '../brand/BrandContainer';
import { FiPlus, FiTrash, FiDownload, FiUpload, FiSave } from 'react-icons/fi';
import { defaultSiteStructure } from './defaultSiteStructure';

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

export function ReactFlowSitemapEditor() {
  // Load initial nodes and edges from the default site structure
  const initialFlow = siteStructureToFlow(defaultSiteStructure);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlow.edges);
  const [siteStructure, setSiteStructure] = useState<SiteStructure>(defaultSiteStructure);
  
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

  return (
    <BrandContainer>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <BrandHeading level={1}>Interactive Sitemap</BrandHeading>
            <BrandText color="muted">
              Drag nodes to rearrange. Connect nodes to create new relationships.
            </BrandText>
          </div>
          
          <div className="flex gap-2">
            <BrandStyledButton variant="outline" onClick={addCategory}>
              <FiPlus className="mr-2" />
              Add Category
            </BrandStyledButton>
            
            <BrandStyledButton variant="outline" onClick={saveSiteStructure}>
              <FiSave className="mr-2" />
              Save
            </BrandStyledButton>
            
            <BrandStyledButton variant="outline" onClick={exportSiteStructure}>
              <FiDownload className="mr-2" />
              Export
            </BrandStyledButton>
            
            <BrandStyledButton variant="outline" onClick={triggerImport}>
              <FiUpload className="mr-2" />
              Import
            </BrandStyledButton>
            <input
              type="file"
              ref={fileInputRef}
              onChange={importSiteStructure}
              accept=".json"
              style={{ display: 'none' }}
            />
          </div>
        </div>
        
        <div className="border rounded-md" style={{ height: '80vh' }}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="bottom-right"
            >
              <Background />
              <Controls />
              <MiniMap />
              
              <Panel position="top-right" className="bg-white p-2 rounded shadow-md">
                <div className="text-sm">
                  <div className="font-medium mb-1">Quick Actions:</div>
                  <ul className="space-y-1">
                    <li>• Double-click empty space to create a new node</li>
                    <li>• Drag between nodes to connect</li>
                    <li>• Highlighted nodes are current pages</li>
                  </ul>
                </div>
              </Panel>
            </ReactFlow>
          </ReactFlowProvider>
        </div>
        
        <BrandCard>
          <CardHeader>
            <CardTitle>Current Site Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="max-h-80 overflow-auto p-4 bg-gray-100 rounded text-xs">
              {JSON.stringify(siteStructure, null, 2)}
            </pre>
          </CardContent>
        </BrandCard>
      </div>
    </BrandContainer>
  );
} 