import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/button';
import { FiAlertCircle, FiServer, FiRefreshCw } from 'react-icons/fi';

interface AiFallbackMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function AiFallbackMessage({
  title = "AI Service Unavailable",
  message = "The AI service (Ollama) is currently unavailable. We're using a fallback mode with pre-generated responses.",
  onRetry
}: AiFallbackMessageProps) {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-md border">
      <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20 border-b">
        <CardTitle className="flex items-center text-yellow-700 dark:text-yellow-400">
          <FiAlertCircle className="mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4 text-muted-foreground">
        <div className="flex flex-col space-y-4">
          <p>{message}</p>
          
          <div className="bg-muted p-4 rounded-md text-sm">
            <h4 className="font-semibold mb-2 flex items-center">
              <FiServer className="mr-2" />
              Troubleshooting Steps
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Make sure Ollama is installed on your system</li>
              <li>Check if the Ollama service is running</li>
              <li>Verify the API is accessible at http://localhost:11434</li>
              <li>Ensure required models are downloaded (llama3.2)</li>
            </ul>
          </div>
        </div>
      </CardContent>
      {onRetry && (
        <CardFooter className="border-t bg-muted/50">
          <Button 
            variant="outline"
            onClick={onRetry}
            className="flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Retry Connection
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 