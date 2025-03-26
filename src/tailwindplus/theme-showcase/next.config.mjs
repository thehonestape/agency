/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '../tailwind-plus-protocol/protocol-js',
    '../tailwind-plus-salient/salient-js',
    '../tailwind-plus-studio/studio-js',
    '../tailwind-plus-radiant/radiant-js',
    '../tailwind-plus-commit/commit-js',
    '../tailwind-plus-keynote/keynote-js',
    '../tailwind-plus-pocket/pocket-js',
    '../tailwind-plus-primer/primer-js',
    '../tailwind-plus-transmit/transmit-js',
  ],
  webpack: (config, { isServer }) => {
    // Allow importing components from outside the src directory
    config.resolve.symlinks = false;
    
    // Add support for importing JSX files
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];
    
    // Add aliases for theme paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@protocol': '../tailwind-plus-protocol/protocol-js',
      '@salient': '../tailwind-plus-salient/salient-js',
      '@studio': '../tailwind-plus-studio/studio-js',
      '@radiant': '../tailwind-plus-radiant/radiant-js',
      '@commit': '../tailwind-plus-commit/commit-js',
      '@keynote': '../tailwind-plus-keynote/keynote-js',
      '@pocket': '../tailwind-plus-pocket/pocket-js',
      '@primer': '../tailwind-plus-primer/primer-js',
      '@transmit': '../tailwind-plus-transmit/transmit-js',
    };
    
    return config;
  },
};

export default nextConfig; 