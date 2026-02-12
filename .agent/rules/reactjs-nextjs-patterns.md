---
trigger: always_on
description: Activated when writing React components or Next.js pages. Enforces React best practices, Next.js App Router conventions, and the Server Component First strategy.
---

# React.js & Next.js Patterns

## 1. React.js Best Practices

### Functional Components

- Use functional components with TypeScript interfaces.

### Hooks

- Extract reusable logic into **Custom Hooks**.
- Ensure proper cleanup in `useEffect`.

### Performance

- Avoid inline function definitions in JSX where possible.
- Use proper `key` props in lists (avoid using array index).
- Implement code splitting via dynamic imports.

---

## 2. Next.js App Router Conventions

### Data Fetching

- Use standard `fetch` or appropriate libraries compatible with Server Components.
- Use URL query parameters for server state management (pagination, search, filtering).

### Optimization

- Utilize `next/image` and `next/font`.
- Implement proper caching strategies and Metadata management.

### Routing

- Follow App Router file conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`.

---

## 3. Server Component First Strategy

Under the Next.js App Router, all components default to **Server Components**. You must strictly control the Client Boundary for optimal performance and SEO.

### Step A: Default to Server Component

If a component meets any of the following criteria, **do NOT** add `'use client'`:

- Only responsible for data fetching
- Only renders static content or content passed via props
- Needs access to backend resources (database, API keys)

### Step B: Conditions for Client Component

Only add `'use client'` at the top of a file when the component requires:

| Condition           | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| **React Hooks**     | Uses `useState`, `useEffect`, `useReducer`, `useContext`, etc.              |
| **Event Listeners** | Contains `onClick`, `onChange`, `onSubmit`, or other interactive attributes |
| **Browser APIs**    | Uses `window`, `document`, `localStorage`, etc.                             |

### Architecture Patterns

#### Pattern A: Leaf Component Principle

Do not mark entire pages (`page.tsx`) or large containers as Client Components.

- **Approach**: Extract the interactive UI fragment into its own small component.
- **Goal**: Keep the parent and surrounding layout as Server Components.

#### Pattern B: Server Actions Integration

- Prefer **Server Actions** for form submissions and data mutations.
- Server Actions can be called directly in Server Components or passed as props to Client Components.

### Implementation Rule

When a Client Component is required, `'use client'` must be on the **first line** of the file (before all imports):

```tsx
// components/molecules/search-bar/search-bar.tsx
'use client';

import { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return <input value={query} onChange={handleChange} />;
};

export default SearchBar;
```
