# Blocks Documentation

This document provides detailed documentation for all Block components available in RUI.

Blocks are composed UI components built from our base UI components. They provide ready-to-use patterns for common UI scenarios.

---

## LoginFormBlock

A login form with email and password inputs.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(e: React.FormEvent) => void` | - | Callback when form is submitted |

### Example
```tsx
import { LoginFormBlock } from "#/components/blocks/LoginFormBlock";

function App() {
  return (
    <LoginFormBlock 
      onSubmit={(e) => {
        e.preventDefault();
        // Handle login
      }} 
    />
  );
}
```

---

## NewsletterBlock

A newsletter subscription form with email input and subscribe button.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` | `"Subscribe to our newsletter for updates"` | Description text |
| `onSubmit` | `(e: React.FormEvent) => void` | - | Callback when form is submitted |

### Example
```tsx
import { NewsletterBlock } from "#/components/blocks/NewsletterBlock";

function App() {
  return (
    <NewsletterBlock
      description="Get the latest updates delivered to your inbox"
      onSubmit={(e) => {
        e.preventDefault();
        // Handle subscription
      }} 
    />
  );
}
```

---

## PricingCardBlock

A pricing card with features list and call-to-action button.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Plan title |
| `price` | `string` | - | Price text (e.g., "$19/mo") |
| `description` | `string` | - | Plan description |
| `features` | `string[]` | - | List of features |
| `buttonText` | `string` | `"Get Started"` | Button text |
| `buttonVariant` | `"primary" \| "secondary"` | `"primary"` | Button style variant |
| `isPopular` | `boolean` | `false` | Show "Popular" badge |
| `onClick` | `() => void` | - | Button click handler |

### Example
```tsx
import { PricingCardBlock } from "#/components/blocks/PricingCardBlock";

function App() {
  return (
    <PricingCardBlock
      title="Pro Plan"
      price="$19/mo"
      description="Perfect for growing teams"
      features={[
        "Unlimited projects",
        "Priority support",
        "Advanced analytics",
        "Team collaboration",
      ]}
      isPopular
      buttonText="Get Started"
      onClick={() => console.log("Selected Pro Plan")}
    />
  );
}
```

---

## UserProfileBlock

A user profile card with avatar, name, email, and action buttons.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | User name |
| `email` | `string` | - | User email |
| `avatar` | `string` | - | Avatar image URL |
| `isOnline` | `boolean` | `false` | Show online status indicator |
| `onEdit` | `() => void` | - | Edit button click handler |
| `onMessage` | `() => void` | - | Message button click handler |

### Example
```tsx
import { UserProfileBlock } from "#/components/blocks/UserProfileBlock";

function App() {
  return (
    <UserProfileBlock
      name="Sarah Johnson"
      email="sarah@example.com"
      avatar="/avatar.jpg"
      isOnline
      onEdit={() => console.log("Edit profile")}
      onMessage={() => console.log("Send message")}
    />
  );
}
```

---

## ContactFormBlock

A contact form with name, email, subject, and message fields, plus info alert.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(e: React.FormEvent) => void` | - | Callback when form is submitted |

### Example
```tsx
import { ContactFormBlock } from "#/components/blocks/ContactFormBlock";

function App() {
  return (
    <ContactFormBlock 
      onSubmit={(e) => {
        e.preventDefault();
        // Handle contact form submission
      }} 
    />
  );
}
```

---

## FeatureCardBlock

A feature card with icon, title, description, and optional CTA button.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Feature title |
| `description` | `string` | - | Feature description |
| `icon` | `ReactNode` | - | Icon component |
| `cta` | `string` | `"Learn More"` | Button text |
| `onClick` | `() => void` | - | Button click handler |

### Example
```tsx
import { FeatureCardBlock } from "#/components/blocks/FeatureCardBlock";
import { Zap } from "lucide-react";

function App() {
  return (
    <FeatureCardBlock
      title="Lightning Fast"
      description="Built with performance in mind using React Aria Components."
      icon={<Zap size={24} />}
      cta="Learn More"
      onClick={() => console.log("Learn more clicked")}
    />
  );
}
```

---

## StatsBlock

A stats display grid showing metrics with optional change indicators.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stats` | `StatItem[]` | - | Array of stat items |

### StatItem
| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Stat label |
| `value` | `string \| number` | Stat value |
| `change` | `string` | Change text (e.g., "+12%") |
| `isPositive` | `boolean` | Whether change is positive (green) or negative (red) |

### Example
```tsx
import { StatsBlock } from "#/components/blocks/StatsBlock";

function App() {
  return (
    <StatsBlock
      stats={[
        { 
          label: "Total Users", 
          value: "24.5K", 
          change: "+12%", 
          isPositive: true 
        },
        { 
          label: "Revenue", 
          value: "$48.2K", 
          change: "+8%", 
          isPositive: true 
        },
        { 
          label: "Bounce Rate", 
          value: "32.4%", 
          change: "-3%", 
          isPositive: true 
        },
      ]}
    />
  );
}
```

---

## Usage Tips

- All blocks follow the same styling conventions as base components
- Blocks can be customized via their props
- For complex customizations, consider building your own block from base components
- Blocks are accessible by default, inheriting accessibility from base components

## Live Demo

Visit the `/blocks` page to see all blocks in action with live examples and code samples.
