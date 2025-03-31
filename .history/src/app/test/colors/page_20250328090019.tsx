import { ColorScale } from '@/components/ui/ColorScale';

export default function ColorTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Color Scale Test</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4">Default Colors</h2>
          <ColorScale 
            primaryColor="#3b82f6"
            secondaryColor="#10b981"
            accentColor="#f59e0b"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Custom Colors</h2>
          <ColorScale 
            primaryColor="#8b5cf6"
            secondaryColor="#ec4899"
            accentColor="#14b8a6"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Dark Colors</h2>
          <ColorScale 
            primaryColor="#1e40af"
            secondaryColor="#065f46"
            accentColor="#92400e"
          />
        </section>
      </div>
    </div>
  );
} 