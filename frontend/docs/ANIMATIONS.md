# Animation System Documentation

This document outlines the animation system implemented in the Science 1B website using Framer Motion.

## Overview

The website features smooth, lightweight animations that enhance user experience without compromising performance. All animations respect user preferences for reduced motion and are optimized for various devices.

## Animation Components

### 1. ScrollAnimation
**Location**: `src/components/animations/ScrollAnimation.tsx`

A reusable component for scroll-triggered animations.

```tsx
<ScrollAnimation direction="up" distance={50} delay={0.2}>
  <div>Content to animate</div>
</ScrollAnimation>
```

**Props**:
- `direction`: 'up' | 'down' | 'left' | 'right' (default: 'up')
- `distance`: Number of pixels to move (default: 50)
- `delay`: Animation delay in seconds (default: 0)
- `duration`: Animation duration in seconds (default: 0.6)

### 2. StaggerAnimation
**Location**: `src/components/animations/StaggerAnimation.tsx`

Animates children elements with a staggered delay.

```tsx
<StaggerAnimation staggerDelay={0.1}>
  {items.map(item => <Item key={item.id} />)}
</StaggerAnimation>
```

**Props**:
- `staggerDelay`: Delay between each child animation (default: 0.1)
- `itemDelay`: Initial delay before starting animations (default: 0)

### 3. Lightbox
**Location**: `src/components/animations/Lightbox.tsx`

Full-screen image viewer with navigation.

```tsx
<Lightbox
  isOpen={isOpen}
  onClose={closeLightbox}
  images={imageArray}
  currentIndex={currentIndex}
  onNext={nextImage}
  onPrev={prevImage}
/>
```

**Features**:
- Keyboard navigation (Arrow keys, Escape)
- Touch/swipe support
- Image counter
- Caption display
- Smooth transitions

### 4. Performance Optimizations
**Location**: `src/components/animations/PerformanceOptimizations.tsx`

Optimized components that respect user motion preferences.

- `OptimizedMotion`: Hardware-accelerated motion component
- `OptimizedScrollAnimation`: Intersection observer optimized
- `OptimizedStaggerAnimation`: Performance-optimized stagger

## Animation Features

### 1. Header Animations
- **Sticky behavior**: Smooth background blur on scroll
- **Logo rotation**: 360° rotation on hover
- **Navigation items**: Subtle lift effect on hover
- **Mobile menu**: Smooth slide-down animation

### 2. Gallery Animations
- **Card hover**: Lift and scale effects
- **Image zoom**: Smooth scale on hover
- **Overlay effects**: Fade-in overlays with icons
- **Lightbox**: Full-screen image viewing with navigation

### 3. Article Card Animations
- **Hover effects**: Lift, scale, and shadow changes
- **Image zoom**: Smooth scale on hover
- **Tag interactions**: Color changes on hover
- **Button animations**: Arrow movement and scale effects

### 4. Scroll Animations
- **Section reveals**: Fade-in and slide-up effects
- **Staggered content**: Sequential animation of list items
- **Stats counters**: Scale-in animations for numbers
- **Feature cards**: Individual card animations

## Performance Optimizations

### 1. Hardware Acceleration
```css
.animate-optimized {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0);
}
```

### 2. Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. Intersection Observer
- Animations only trigger when elements are in viewport
- One-time animations to prevent re-triggering
- Configurable margins for early triggering

### 4. Optimized Transitions
- Short duration (0.3s average)
- Ease-out timing functions
- Minimal property changes
- GPU-accelerated transforms

## Animation Guidelines

### 1. Duration
- **Micro interactions**: 0.1s - 0.2s
- **Hover effects**: 0.2s - 0.3s
- **Page transitions**: 0.4s - 0.6s
- **Scroll animations**: 0.6s - 0.8s

### 2. Easing
- **Ease-out**: Most common for UI elements
- **Ease-in-out**: For complex animations
- **Spring**: For bouncy effects (rarely used)

### 3. Properties
- **Transform**: Use for position, scale, rotation
- **Opacity**: For fade effects
- **Avoid**: Changing layout properties (width, height, margin)

### 4. Accessibility
- Respect `prefers-reduced-motion`
- Provide alternative feedback for interactions
- Ensure animations don't cause motion sickness
- Maintain focus indicators

## Implementation Examples

### Basic Scroll Animation
```tsx
import ScrollAnimation from '@/components/animations/ScrollAnimation';

<ScrollAnimation direction="up" distance={60}>
  <h2>Animated Heading</h2>
</ScrollAnimation>
```

### Staggered List Animation
```tsx
import StaggerAnimation from '@/components/animations/StaggerAnimation';

<StaggerAnimation staggerDelay={0.1}>
  {items.map(item => (
    <Item key={item.id} item={item} />
  ))}
</StaggerAnimation>
```

### Hover Animation
```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  <Card />
</motion.div>
```

### Page Transition
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
>
  <PageContent />
</motion.div>
```

## Browser Support

- **Modern browsers**: Full support with hardware acceleration
- **Older browsers**: Graceful degradation to CSS transitions
- **Mobile devices**: Optimized for touch interactions
- **Screen readers**: Animations don't interfere with accessibility

## Performance Metrics

### Target Performance
- **60 FPS**: All animations maintain smooth frame rate
- **< 16ms**: Animation frame time
- **< 100ms**: Interaction response time
- **< 1s**: Page load with animations

### Optimization Techniques
1. **Transform-only animations**: Use transform and opacity
2. **Intersection Observer**: Only animate visible elements
3. **RequestAnimationFrame**: Sync with browser refresh rate
4. **Will-change**: Hint browser about upcoming changes
5. **Backface-visibility**: Prevent unnecessary repaints

## Troubleshooting

### Common Issues
1. **Janky animations**: Check for layout-triggering properties
2. **Memory leaks**: Ensure proper cleanup of event listeners
3. **Performance issues**: Use React DevTools Profiler
4. **Accessibility**: Test with screen readers and reduced motion

### Debug Tools
- Chrome DevTools Performance tab
- React DevTools Profiler
- Framer Motion DevTools
- Lighthouse performance audit

## Future Enhancements

1. **Gesture support**: Swipe and drag animations
2. **3D transforms**: Subtle 3D effects for depth
3. **Physics animations**: Spring-based interactions
4. **Custom easing**: Brand-specific animation curves
5. **Animation presets**: Reusable animation combinations

## Best Practices

1. **Keep it subtle**: Animations should enhance, not distract
2. **Consistent timing**: Use consistent durations and easing
3. **Performance first**: Optimize for smooth 60fps
4. **Accessibility**: Always consider reduced motion preferences
5. **Mobile-friendly**: Ensure touch interactions work well
6. **Test thoroughly**: Check on various devices and browsers
