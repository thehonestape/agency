import React from 'react';

// Simple polyfill for Next.js Image component
const Image = React.forwardRef(({
  src,
  alt,
  width,
  height,
  layout,
  objectFit,
  quality,
  priority,
  loading = 'lazy',
  unoptimized,
  ...props
}, ref) => {
  // Map Next.js props to standard img props
  const styleProps = {};
  
  if (layout === 'fill') {
    styleProps.position = 'absolute';
    styleProps.inset = 0;
    styleProps.width = '100%';
    styleProps.height = '100%';
  }
  
  if (objectFit) {
    styleProps.objectFit = objectFit;
  }
  
  return (
    <img
      ref={ref}
      src={src}
      alt={alt || ''}
      width={layout === 'fill' ? undefined : width}
      height={layout === 'fill' ? undefined : height}
      loading={priority ? 'eager' : loading}
      style={{
        ...styleProps,
        ...props.style,
      }}
      {...props}
    />
  );
});

Image.displayName = 'NextImage';

export default Image; 