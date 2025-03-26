import { useNavigate, useLocation, useParams } from 'react-router-dom';

// Mock Next.js router functionality using React Router
export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  return {
    route: location.pathname,
    pathname: location.pathname,
    query: Object.fromEntries(new URLSearchParams(location.search)),
    asPath: location.pathname + location.search,
    push: navigate,
    replace: (url) => navigate(url, { replace: true }),
    back: () => navigate(-1),
    events: {
      on: () => {},
      off: () => {},
    },
    isFallback: false,
    isReady: true,
    params,
  };
}

export default { useRouter }; 