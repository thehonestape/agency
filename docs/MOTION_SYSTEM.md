# Motion System Documentation

This document outlines the motion system used throughout the Workhorse application to create consistent and engaging animations.

## Core Concepts

The motion system is built around these core concepts:

1. **Presets** - Reusable animation values like durations, easings, and transitions
2. **Variants** - Named animation states for different elements (hidden, visible, exit)
3. **Components** - Ready-to-use animated React components
4. **Utilities** - Helper functions to create custom animations

## Motion Settings

### Durations

```typescript
export const durations = {
  fastest: 0.1, // Ultra quick interactions
  fast: 0.2, // Button presses, small UI elements
  normal: 0.3, // Standard animations
  slow: 0.5, // Larger UI elements, emphasis
  slowest: 0.8, // Full page transitions, dramatic effects
};
```

### Easings

```typescript
export const easings = {
  // Smooth animations
  smooth: [0.4, 0, 0.2, 1], // Standard easing
  smoothOut: [0, 0, 0.2, 1], // For elements entering the screen
  smoothIn: [0.4, 0, 1, 1], // For elements exiting the screen

  // Bouncy animations
  bounce: [0.175, 0.885, 0.32, 1.275], // Bouncy effect

  // Elastic animations
  elastic: [0.25, 0.1, 0.25, 1], // Slight elastic feeling
};
```

### Transitions

```typescript
export const transitions = {
  fade: { duration: durations.normal, ease: easings.smooth },
  slide: { type: 'spring', stiffness: 300, damping: 30 },
  scale: { duration: durations.normal, ease: easings.bounce },
  // and more...
};
```

## Available Motion Components

The system provides ready-to-use motion components:

### Basic Animations

- `<FadeIn>` - Fade in animation
- `<SlideUp>` - Slide up from below
- `<SlideDown>` - Slide down from above
- `<SlideLeft>` - Slide in from the right
- `<SlideRight>` - Slide in from the left
- `<ScaleIn>` - Scale up animation

### Interactive Components

- `<MotionCard>` - Card with hover and tap animations
- `<WithHover>` - Adds hover animation to any element
- `<WithTap>` - Adds tap animation to any element
- `<WithTapHover>` - Combines hover and tap animations

### Layout Components

- `<MotionList>` - Container for staggered list animations
- `<MotionItem>` - Items to be used within `<MotionList>`
- `<PageTransition>` - Page transition container
- `<MotionLayout>` - Layout wrapper for page transitions

## Usage Examples

### Basic Animation

```tsx
import { FadeIn, SlideUp } from '../components/motion';

function MyComponent() {
  return (
    <FadeIn>
      <h1>This content will fade in</h1>

      <SlideUp delay={0.2}>
        <p>This will slide up after a small delay</p>
      </SlideUp>
    </FadeIn>
  );
}
```

### List Animation

```tsx
import { MotionList, MotionItem } from '../components/motion';

function MyList({ items }) {
  return (
    <MotionList>
      {items.map((item, index) => (
        <MotionItem key={item.id}>
          <div className="card">{item.name}</div>
        </MotionItem>
      ))}
    </MotionList>
  );
}
```

### Interactive Elements

```tsx
import { WithTapHover, MotionCard } from '../components/motion';

function MyInteractiveComponent() {
  return (
    <div>
      <WithTapHover>
        <button>Click me</button>
      </WithTapHover>

      <MotionCard>
        <div className="card-content">
          <h3>Interactive Card</h3>
          <p>This card has hover and tap animations</p>
        </div>
      </MotionCard>
    </div>
  );
}
```

### Page Transitions

```tsx
import { PageTransition } from '../components/motion';

function MyPage() {
  return (
    <PageTransition>
      <div className="page-content">
        <h1>My Page</h1>
        <p>This entire page will animate in and out.</p>
      </div>
    </PageTransition>
  );
}
```

## Custom Animations

For custom animations, you can use the utility functions:

```tsx
import { motion } from 'framer-motion';
import { createHoverAnimation, createTapAnimation } from '../lib/motion';

function MyCustomComponent() {
  return (
    <motion.div {...createHoverAnimation(1.05)} {...createTapAnimation(0.95)}>
      Custom animated element
    </motion.div>
  );
}
```

## Best Practices

1. **Consistency** - Use the predefined components for common animations to ensure consistency across the app.

2. **Performance** - Avoid animating layout properties like width or height; prefer transform properties (scale, translate) for better performance.

3. **Accessibility** - Be mindful of users who prefer reduced motion. Use the `prefers-reduced-motion` media query to disable or simplify animations.

4. **Purpose** - Use animations with purpose to enhance UX, not just for decoration.

5. **Subtlety** - Keep animations subtle and brief. Overly long or dramatic animations can become annoying.

6. **Timing** - Use appropriate timing based on the element size and purpose:
   - Small UI elements: faster animations (0.1-0.2s)
   - Medium elements: moderate animations (0.2-0.4s)
   - Large elements/pages: slower animations (0.4-0.8s)

## Integration with Design System

This motion system is designed to work seamlessly with our existing UI components from both Shadcn and Tremor:

```tsx
import { Card, CardContent } from '../components/ui/Card';
import { MotionCard } from '../components/motion';

function MyComponent() {
  return (
    <MotionCard>
      <Card>
        <CardContent>
          <h3>Animated Card</h3>
        </CardContent>
      </Card>
    </MotionCard>
  );
}
```
