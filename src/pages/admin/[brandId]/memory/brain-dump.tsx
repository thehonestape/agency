import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { Card, Button, ScrollArea, Badge, Alert } from '../../../../components/ui';
import { FileUpload } from '../../../../components/FileUpload';
import { aiService } from '../../../../services/aiService';
import { storageService, FileInfo } from '../../../../services/storageService';

// Types for brain dump items
interface BrainDumpItem {
  id: string;
  type: 'note' | 'file';
  content: string;
  position: { x: number; y: number };
  fileInfo?: FileInfo;
}

interface AIInsight {
  id: string;
  content: string;
  confidence: number;
  category: 'observation' | 'suggestion' | 'warning';
}

export default function BrainDumpPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const [items, setItems] = useState<BrainDumpItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleFileUpload = async (fileInfo: FileInfo) => {
    setIsProcessing(true);
    try {
      // Process the file with AI
      const aiResponse = await aiService.generateContent({
        prompt: `Analyze this ${fileInfo.type} file and provide insights about its content and potential use in brand strategy. File name: ${fileInfo.name}`,
        context: {
          fileInfo,
          brandId
        }
      });
      
      // Create a new item for the file
      const newItem: BrainDumpItem = {
        id: `file-${Date.now()}`,
        type: 'file',
        content: fileInfo.name,
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        fileInfo
      };

      setItems(prev => [...prev, newItem]);

      // Add AI insight
      const newInsight: AIInsight = {
        id: `insight-${Date.now()}`,
        content: aiResponse.text,
        confidence: 0.85,
        category: 'observation'
      };
      
      setInsights(prev => [...prev, newInsight]);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    
    setItems(items => items.map(item => {
      if (item.id === active.id) {
        return {
          ...item,
          position: {
            x: item.position.x + delta.x,
            y: item.position.y + delta.y,
          },
        };
      }
      return item;
    }));
  };

  const addNote = () => {
    const newItem: BrainDumpItem = {
      id: `note-${Date.now()}`,
      type: 'note',
      content: '',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    setItems(prev => [...prev, newItem]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Brain Dump</h1>
          <p className="text-muted-foreground">Drop brand materials or add notes to your canvas</p>
        </div>
        <Button onClick={addNote}>Add Note</Button>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative overflow-hidden">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="absolute inset-0">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="absolute p-4 cursor-move shadow-lg"
                  style={{
                    transform: `translate(${item.position.x}px, ${item.position.y}px)`,
                    minWidth: '200px',
                  }}
                >
                  {item.type === 'note' ? (
                    <textarea
                      className="w-full resize-none border-none focus:outline-none bg-transparent"
                      placeholder="Type your note here..."
                      value={item.content}
                      onChange={(e) => {
                        setItems(items.map(i => 
                          i.id === item.id ? { ...i, content: e.target.value } : i
                        ));
                      }}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        {/* File icon would go here */}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{item.content}</p>
                        {item.fileInfo && (
                          <p className="text-sm text-muted-foreground truncate">
                            {item.fileInfo.size} • {item.fileInfo.type}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </DndContext>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <FileUpload
              onFileUpload={handleFileUpload}
              bucketName="brain-dump"
              folder={`brands/${brandId}`}
              className="w-96"
            />
          </div>
        </div>

        <div className="w-80 border-l">
          <div className="p-4 border-b">
            <h2 className="font-semibold">AI Insights</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="p-4 space-y-4">
              {isProcessing && (
                <Alert>
                  <p>Processing your files...</p>
                </Alert>
              )}
              {insights.map((insight) => (
                <Card
                  key={insight.id}
                  className={`p-4 cursor-pointer transition ${
                    activeInsight === insight.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setActiveInsight(insight.id)}
                >
                  <div className="flex items-start gap-2">
                    <Badge variant={
                      insight.category === 'warning' ? 'destructive' :
                      insight.category === 'suggestion' ? 'secondary' :
                      'default'
                    }>
                      {insight.category}
                    </Badge>
                    <p className="text-sm">{insight.content}</p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}