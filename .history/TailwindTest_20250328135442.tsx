import React, { useState } from 'react';

export const TailwindTest: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Tailwind Test</h1>
            <button 
              onClick={toggleTheme}
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
            >
              Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
        </header>

        <main className="space-y-12">
          {/* Color System */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b pb-2">Color System</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'].map(color => (
                <div key={color} className="space-y-2">
                  <div className={`h-20 rounded-md bg-${color} flex items-end p-2`}>
                    <span className={`text-${color}-foreground text-sm font-medium`}>bg-{color}</span>
                  </div>
                  <div className={`h-12 rounded-md bg-${color}/20 flex items-center justify-center`}>
                    <span className="text-sm">bg-{color}/20</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Spacing */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b pb-2">Spacing Scale</h2>
            
            <div className="space-y-4">
              {[1, 2, 4, 6, 8, 12, 16].map(space => (
                <div key={space} className="flex items-center">
                  <div className={`h-8 bg-primary w-${space}`}></div>
                  <span className="ml-4 text-sm">w-{space} = {space * 0.25}rem</span>
                </div>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b pb-2">Typography</h2>
            
            <div className="space-y-4">
              <div>
                <h1 className="text-5xl font-bold">Heading 1 (text-5xl)</h1>
                <p className="text-sm text-gray-500">font-size: 3rem</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">Heading 2 (text-4xl)</h2>
                <p className="text-sm text-gray-500">font-size: 2.25rem</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">Heading 3 (text-3xl)</h3>
                <p className="text-sm text-gray-500">font-size: 1.875rem</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">Heading 4 (text-2xl)</h4>
                <p className="text-sm text-gray-500">font-size: 1.5rem</p>
              </div>
              <div>
                <h5 className="text-xl font-bold">Heading 5 (text-xl)</h5>
                <p className="text-sm text-gray-500">font-size: 1.25rem</p>
              </div>
              <div>
                <p className="text-base">Regular paragraph text (text-base)</p>
                <p className="text-sm text-gray-500">font-size: 1rem</p>
              </div>
              <div>
                <p className="text-sm">Small text (text-sm)</p>
                <p className="text-sm text-gray-500">font-size: 0.875rem</p>
              </div>
              <div>
                <p className="text-xs">Extra small text (text-xs)</p>
                <p className="text-sm text-gray-500">font-size: 0.75rem</p>
              </div>
            </div>
          </section>

          {/* Components */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b pb-2">Basic Components</h2>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                    Primary
                  </button>
                  <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90">
                    Secondary
                  </button>
                  <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90">
                    Accent
                  </button>
                  <button className="bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                    Outline
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(item => (
                    <div key={item} className="border rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-gray-100 h-40 flex items-center justify-center">
                        <span className="text-gray-400">Image {item}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">Card Title {item}</h3>
                        <p className="text-gray-600 mt-2">This is a sample card with some content. Cards can be used to display grouped information.</p>
                        <div className="mt-4">
                          <button className="text-primary hover:underline">Learn more</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Form Elements</h3>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Text Input</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Enter some text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" id="country-label">Select</label>
                    <select
                      aria-labelledby="country-label"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="remember" 
                      type="checkbox" 
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-20 pt-8 border-t">
          <p className="text-center text-gray-500">
            Tailwind Test Page &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}; 