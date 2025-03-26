# Getting Started with Workhorse Agency

This guide will help you set up and start developing on the Workhorse Agency project quickly.

## 1. Development Environment Setup

```bash
# Clone the repository
git clone git@github.com:your-org/agency.git

# Navigate to the project directory
cd agency

# Install dependencies
yarn install

# Start the development server
yarn dev
```

The dev server will be available at http://localhost:5173

## 2. Key Files to Understand

- `src/styles/globals.css` - Main styles and theme variables
- `tailwind.config.js` - Tailwind configuration
- `src/components/ui/` - Core UI components
- `src/components/layouts/` - Application layout components
- `src/components/features/` - Feature-specific components
- `src/components/index.ts` - Component exports

## 3. Component Structure

Our component architecture follows a domain-driven organization pattern:

```
src/components/
├── ui/                  # Core UI components
├── layouts/             # Layout components
│   ├── application/     # Application shell layouts
│   └── page/            # Page layout patterns
├── features/            # Domain-specific components
│   ├── auth/            # Authentication
│   ├── brand/           # Brand management
│   ├── dashboard/       # Dashboard components
│   ├── editor/          # Content editors
│   ├── marketing/       # Marketing components
│   └── projects/        # Project management
└── [utility components] # Individual utility components
```

## 4. Development Workflow

1. **Understand Component Organization** - Review this document and COMPONENT-ORGANIZATION.md
2. **Create/Modify Components** - Follow the component patterns established
3. **Test in Light/Dark Modes** - Always test both themes
4. **Ensure Accessibility** - Follow accessibility best practices

## 5. Theming Quick Reference

- Use theme CSS variables for colors, not hardcoded values
- Dark mode is implemented via the `.dark` class
- All colors should use the HSL format
- Example: `bg-primary text-primary-foreground`

## 6. Available Scripts

```bash
# Development
yarn dev                   # Start dev server
yarn test:watch            # Run tests in watch mode

# Build
yarn build                 # Production build
yarn preview               # Preview production build
```

## 7. What to Work On

Our current development priorities are:

1. **UI Components** - Complete the core UI components with theming
2. **Layout Structure** - Implement application shells and page layouts
3. **Feature Components** - Develop domain-specific feature components
4. **Theming System** - Enhance theme switching and customization
5. **Documentation** - Improve component documentation

## 8. Component Implementation Pattern

Here's a basic pattern for implementing new components:

```tsx
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button 
      className={cn(
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        variant === "outline" && "bg-background border border-input",
        className
      )}
      {...props}
    />
  );
}
```

## 9. Working with Layouts

When implementing pages, use the layout components:

```tsx
import { LightSidebarWithHeader } from "@/components/layouts/application/sidebar";

export function DashboardPage() {
  return (
    <LightSidebarWithHeader>
      <main>
        {/* Page content */}
      </main>
    </LightSidebarWithHeader>
  );
}
```

## 10. Helpful Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Router Documentation](https://reactrouter.com/en/main)

Happy coding! 