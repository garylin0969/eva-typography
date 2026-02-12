---
trigger: always_on
description: Activated when creating components or UI blocks. Enforces Atomic Design architecture and specific file export conventions.
---

# Component Structure (Atomic Design)

All components must be organized following the **Atomic Design** architecture.

## 1. Directory Structure

Place components according to their complexity level:

| Level         | Path                    | Description                          | Examples                  |
| ------------- | ----------------------- | ------------------------------------ | ------------------------- |
| **Atoms**     | `components/atoms/`     | Smallest unit, indivisible           | Button, Input, Icon       |
| **Molecules** | `components/molecules/` | Small groups composed of Atoms       | SearchBar, Card           |
| **Organisms** | `components/organisms/` | Composed of multiple Molecules/Atoms | Header, Footer, LoginForm |

## 2. Naming Convention

> **Note**: For file and directory naming rules, refer to the `file-naming-convention` rule.

- **Directory names**: Strictly use **kebab-case** (e.g., `user-avatar`)
- **File names**: Strictly use **kebab-case** (e.g., `user-avatar.tsx`)
- **Component variable names**: Use **PascalCase** (e.g., `UserAvatar`)

## 3. File Composition

Each component must be an independent directory containing an `index.ts` and the component file itself.

### Rule A: Component File (`<component-name>.tsx`)

- **Syntax**: Must use **Arrow Functions**
- **Export**: Must use `export default`

```tsx
// components/organisms/site-footer/site-footer.tsx

interface SiteFooterProps {
    copyright?: string;
}

const SiteFooter = ({ copyright }: SiteFooterProps) => {
    return <footer>{copyright}</footer>;
};

export default SiteFooter;
```

### Rule B: Index File (`index.ts`)

- **Syntax**: Use `export { default }` for re-exporting
- **Extension**: Additional types can be exported here if needed

```ts
// components/organisms/site-footer/index.ts

export { default } from './site-footer';

// Export additional types if needed
// export type { SiteFooterProps } from './site-footer';
```
