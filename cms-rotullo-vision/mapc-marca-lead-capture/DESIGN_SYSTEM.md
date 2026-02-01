# MAPC Landing Page - Design System

## Overview
This design system provides a comprehensive framework for the MAPC lead capture landing page, ensuring visual consistency, accessibility, and maintainability across all components.

## Brand Identity

### Primary Colors
- **MAPC Blue**: `hsl(236, 93%, 24%)` - Primary brand color
- **MAPC Red**: `hsl(0, 72%, 51%)` - Accent color for CTAs and highlights

### Color Palette
```css
/* Primary Brand Colors */
--primary: 236 93% 24%;           /* MAPC Deep Blue */
--primary-light: 234 89% 74%;     /* Light Blue for gradients */
--primary-dark: 236 93% 18%;      /* Darker blue for emphasis */

--accent: 0 72% 51%;              /* MAPC Red */
--accent-light: 0 70% 85%;        /* Light red for backgrounds */
--accent-dark: 0 72% 41%;         /* Darker red for emphasis */

/* Semantic Colors */
--success: 142 76% 36%;           /* Green for success states */
--warning: 38 92% 50%;            /* Orange for warnings */
--info: 221 83% 53%;              /* Blue for information */
--destructive: 0 84.2% 60.2%;     /* Red for errors */
```

## Typography Scale
```css
--font-size-xs: 0.75rem;          /* 12px */
--font-size-sm: 0.875rem;         /* 14px */
--font-size-base: 1rem;           /* 16px */
--font-size-lg: 1.125rem;         /* 18px */
--font-size-xl: 1.25rem;          /* 20px */
--font-size-2xl: 1.5rem;          /* 24px */
--font-size-3xl: 1.875rem;        /* 30px */
--font-size-4xl: 2.25rem;         /* 36px */
--font-size-5xl: 3rem;            /* 48px */
--font-size-6xl: 3.75rem;         /* 60px */
```

## Spacing System
```css
--space-xs: 0.25rem;              /* 4px */
--space-sm: 0.5rem;               /* 8px */
--space-md: 1rem;                 /* 16px */
--space-lg: 1.5rem;               /* 24px */
--space-xl: 2rem;                 /* 32px */
--space-2xl: 2.5rem;              /* 40px */
--space-3xl: 3rem;                /* 48px */
--space-4xl: 4rem;                /* 64px */
--space-5xl: 5rem;                /* 80px */
--space-6xl: 6rem;                /* 96px */
```

## Button System

### Button Variants
```css
.btn-hero         /* Primary CTA - gradient background */
.btn-primary      /* Standard primary button */
.btn-secondary    /* Secondary button */
.btn-outline      /* Outlined button */
.btn-ghost        /* Text-only button */
```

### Usage Guidelines
- **Hero Button**: Use for main CTAs, conversion actions
- **Primary Button**: Use for important actions
- **Secondary Button**: Use for supporting actions
- **Outline Button**: Use for alternative actions
- **Ghost Button**: Use for subtle actions, navigation

## Card System

### Card Variants
```css
.card-default     /* Standard card with border and shadow */
.card-hover       /* Interactive card with hover effects */
.card-interactive /* Clickable card with background hover */
.card-gradient    /* Card with gradient background */
```

## Layout Utilities

### Section Padding
```css
.section-padding     /* Standard section padding: py-16 px-4 sm:px-6 lg:px-8 */
.section-padding-sm  /* Small section padding: py-8 */
.section-padding-lg  /* Large section padding: py-24 */
```

### Container Widths
```css
.container-narrow    /* max-w-4xl mx-auto */
.container-wide      /* max-w-7xl mx-auto */
```

## Text Utilities

### Gradient Text
```css
.text-gradient-primary  /* Primary brand gradient */
.text-gradient-accent   /* Accent gradient */
```

### Typography Classes
```css
.text-hero        /* Large hero text: text-4xl sm:text-5xl lg:text-6xl */
.text-heading     /* Section headings: text-2xl sm:text-3xl lg:text-4xl */
.text-subheading  /* Subheadings: text-lg sm:text-xl */
```

## Shadow System
```css
--shadow-xs: 0 1px 2px 0 hsl(0 0% 0% / 0.05);
--shadow-sm: 0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
--shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.1), 0 2px 4px -2px hsl(0 0% 0% / 0.1);
--shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.1), 0 4px 6px -4px hsl(0 0% 0% / 0.1);
--shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.1), 0 8px 10px -6px hsl(0 0% 0% / 0.1);
--shadow-2xl: 0 25px 50px -12px hsl(0 0% 0% / 0.25);

/* Brand-specific shadows */
--shadow-primary: 0 10px 30px -10px hsl(var(--primary) / 0.3);
--shadow-accent: 0 10px 30px -10px hsl(var(--accent) / 0.3);
--shadow-hover: 0 20px 25px -5px hsl(var(--primary) / 0.15);
```

## Animation System

### Keyframes
```css
@keyframes fade-in
@keyframes fade-out
@keyframes scale-in
@keyframes scale-out
@keyframes slide-in-right
@keyframes slide-out-right
@keyframes pulse-slow
```

### Animation Classes
```css
.animate-fade-in      /* Fade in with slide up */
.animate-slide-up     /* Slide in from bottom */
.animate-scale-in     /* Scale in from center */
.hover-lift           /* Lift on hover */
.hover-glow           /* Glow shadow on hover */
```

## Gradient System
```css
.bg-gradient-primary  /* Primary brand gradient */
.bg-gradient-hero     /* Hero section gradient */
.bg-gradient-accent   /* Accent gradient */
.bg-gradient-subtle   /* Subtle background gradient */
.bg-gradient-card     /* Card background gradient */
```

## Form System

### Form Classes
```css
.form-field      /* Form field container */
.form-input      /* Styled input field */
.form-error      /* Error message styling */
.form-success    /* Success message styling */
```

## Responsive Utilities
```css
.responsive-grid  /* Responsive grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 */
.responsive-flex  /* Responsive flex: flex-col lg:flex-row */
```

## Dark Mode Support
All colors automatically support dark mode through CSS variables. The system switches between light and dark themes seamlessly.

## Accessibility
- All color combinations meet WCAG AA contrast requirements
- Focus states are clearly defined for all interactive elements
- Semantic HTML structure is maintained throughout
- Screen reader friendly component structure

## Usage Examples

### Hero Section
```tsx
<section className="section-padding-lg bg-gradient-hero">
  <div className="container-narrow text-center">
    <h1 className="text-hero text-gradient-primary mb-6">
      Transform Your Business
    </h1>
    <p className="text-subheading mb-8">
      Professional solutions for modern challenges
    </p>
    <button className="btn-hero">
      Get Started Today
    </button>
  </div>
</section>
```

### Feature Cards
```tsx
<div className="responsive-grid section-padding">
  <div className="card-default card-hover p-6">
    <h3 className="text-heading mb-4">Feature One</h3>
    <p className="text-muted-foreground mb-4">Description</p>
    <button className="btn-outline">Learn More</button>
  </div>
</div>
```

### Forms
```tsx
<div className="form-field">
  <label className="block text-sm font-medium mb-2">Email</label>
  <input type="email" className="form-input" />
  <p className="form-error hidden">Please enter a valid email</p>
</div>
```

## Best Practices

1. **Always use semantic tokens** instead of direct colors
2. **Maintain consistency** by using predefined classes
3. **Test in both light and dark modes** before deployment
4. **Use appropriate button variants** for different action types
5. **Apply hover effects** to interactive elements
6. **Ensure proper spacing** with the spacing system
7. **Use responsive utilities** for mobile-first design
8. **Follow accessibility guidelines** for all components

## Integration with Components

This design system is fully integrated with:
- All UI components in `src/components/ui/`
- Button variants in `src/components/ui/button.tsx`
- Form components and validation
- Layout components and containers
- Animation and transition utilities

Remember: Always prefer using design system classes over custom CSS to maintain consistency and reduce technical debt.