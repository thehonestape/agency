import React from 'react';

const DemoPage = () => {
  return (
    <div className="h-full flex-1">
      <article className="prose prose-lg h-full max-w-none p-6">
        <h1>Welcome to the Demo</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2>Left Column</h2>
            <p>
              This is a demonstration of the typography plugin with a two-column layout. The
              typography plugin provides beautiful typographic defaults while maintaining
              flexibility in the layout.
            </p>
            <h3>Features</h3>
            <ul>
              <li>Responsive typography</li>
              <li>Beautiful vertical rhythm</li>
              <li>Proper heading hierarchy</li>
              <li>Balanced whitespace</li>
            </ul>
          </div>

          <div>
            <h2>Right Column</h2>
            <p>
              The content automatically adjusts its typography based on the viewport size. We've
              removed the <code>xl:pr-96</code> padding to allow the content to extend fully to the
              right edge.
            </p>
            <blockquote>
              <p>
                "Typography is the art and technique of arranging type to make written language
                legible, readable, and appealing when displayed."
              </p>
            </blockquote>
          </div>
        </div>

        <hr />

        <h2>Full Width Content</h2>
        <p>
          This section spans the full width of the container to demonstrate how the typography
          plugin handles different content widths and maintains readability.
        </p>
      </article>
    </div>
  );
};

export default DemoPage;
