---
trigger: always_on
description: Activated when building UI. Enforces Tailwind CSS usage, Shadcn UI / Radix UI component patterns, and form validation standards.
---

# UI & Styling Guide

## 1. Styling (Tailwind CSS)

- **Always** use Tailwind CSS utility classes. Avoid custom CSS files or `<style>` tags.
- Follow **Mobile-First** design principles.
- Use standard Tailwind utility classes (e.g., `flex items-center justify-between`).

## 2. Component Libraries

- Use **Shadcn UI** for consistent, pre-built design components.
- Use **Radix UI** primitives for accessible, headless functionality.
- Use **composition** to create modular, reusable components.

## 3. Forms & Validation

- **Validation**: Use **Zod** for schema validation.
- **State Management**: Use **React Hook Form** for form state management.
- **UX**: Provide clear, immediate error messages and loading states.
