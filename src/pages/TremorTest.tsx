import React from 'react';
import { Card, Title, Text, Metric } from '@tremor/react';

export function TremorTest() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Tremor Components Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <Title>Basic Card</Title>
          <Text>This is a basic Tremor card component</Text>
        </Card>

        <Card className="p-4">
          <Title>Metrics Example</Title>
          <Metric>99.9%</Metric>
          <Text>Uptime over the last 30 days</Text>
        </Card>
      </div>
    </div>
  );
} 