export { Navbar, navbarVariants } from "./navbar";
export { NavLink, navLinkVariants } from "./nav-link";

// Semantic navigation composition
export const Navigation = {
  Navbar,
  NavLink,
} as const; 