import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// This is a compatibility layer for Next.js Link component
// It provides a similar API surface but uses React Router underneath
const Link = React.forwardRef(({ href, as, replace, scroll, shallow, passHref, prefetch, locale, ...props }, ref) => {
  // Convert next/link props to react-router props
  const to = href || '/';

  return (
    <RouterLink
      ref={ref}
      to={to}
      replace={replace}
      {...props}
    />
  );
});

Link.displayName = 'NextLink';

export default Link; 