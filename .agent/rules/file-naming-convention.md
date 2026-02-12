---
trigger: always_on
description: Activated when creating or modifying files. Enforces global kebab-case naming and file structure conventions.
---

# File Naming Convention

To maintain consistency across the project's file system, all file names and directory names must strictly follow the **kebab-case** naming convention.

## 1. Core Naming Rule

All file and directory names must convert `camelCase` or `PascalCase` from code into **`kebab-case`**.

| Code Name         | File Name               |
| ----------------- | ----------------------- |
| `useWindowSize`   | `use-window-size.ts`    |
| `AuthService`     | `auth-service.ts`       |
| `dateFormat`      | `date-format.ts`        |
| `UserProfileCard` | `user-profile-card.tsx` |

## 2. Category Specifications

### A. Custom Hooks (`/hooks`)

Hook files must retain the `use-` prefix in lowercase.

- ✅ Correct: `hooks/use-auth-listener.ts`
- ❌ Wrong: `hooks/useAuthListener.ts`

### B. Utilities (`/utils` or `/lib`)

Utility files use kebab-case directly. If organized into subdirectories, those directories must also be kebab-case.

- ✅ Correct: `utils/string-helper.ts`
- ✅ Correct: `utils/api-formatters/date-parser.ts`

### C. Services (`/services`)

API service layer files should describe the service's functionality.

- ✅ Correct: `services/user-api.ts`
- ✅ Correct: `services/payment-gateway.ts`

### D. Types (`/types`)

Type definition files should be named after the primary type they define.

- ✅ Correct: `types/user-profile.ts`
- ✅ Correct: `types/api-response.ts`
- ❌ Wrong: `types/UserProfile.ts`

### E. Constants (`/constants`)

Constant files are named by their topic.

- ✅ Correct: `constants/api-endpoints.ts`
- ✅ Correct: `constants/error-messages.ts`

## 3. Execution Checklist

When generating files of the types above, perform these checks:

1. **Check file name**: Are there any uppercase letters? If so, convert to lowercase with hyphens (`-`).
2. **Check directories**: If creating new directories, ensure they are also kebab-case.
3. **Code exports**: While file names use `kebab-case`, exported variables and functions inside the file still follow standard JS/TS conventions (`camelCase` or `PascalCase`).

---

## Complete Reference Table

| Type        | Code Export Name                       | File Path                      |
| :---------- | :------------------------------------- | :----------------------------- |
| **Hook**    | `export const useScrollPosition = ...` | `hooks/use-scroll-position.ts` |
| **Service** | `export const OrderService = ...`      | `services/order-service.ts`    |
| **Util**    | `export const formatCurrency = ...`    | `utils/format-currency.ts`     |
| **Type**    | `export interface UserProfile ...`     | `types/user-profile.ts`        |
| **Const**   | `export const API_ENDPOINTS = ...`     | `constants/api-endpoints.ts`   |
