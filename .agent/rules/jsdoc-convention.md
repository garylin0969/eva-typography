---
trigger: always_on
description: Activated when writing, refactoring, or explaining TypeScript/JavaScript code. Enforces Google Style Traditional Chinese JSDoc comments on all exported functions, classes, interfaces, and components.
---

# JSDoc Convention (Google Style)

To ensure code readability and IDE support, all exported code entities must follow the JSDoc specification from the Google JavaScript Style Guide. All descriptive text must be written in **Traditional Chinese (Taiwan)**.

> 📚 **Reference**: [Google JavaScript Style Guide - JSDoc](https://google.github.io/styleguide/jsguide.html#jsdoc)

## 1. Core Principles

- **Language**: All descriptive text must be in **Traditional Chinese** (Taiwan conventions).
- **Format**: Must use `/** ... */` multi-line comment format.
- **Timing**: A JSDoc comment must be placed before any `export`ed Function, Component, Interface, Type, or Class.

## 2. Tag Standards

Following Google Style, use these standard tags:

| Tag                   | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| `@param {Type} name`  | Describes the parameter's name, type, and purpose. Mark optional params with `[name]`. |
| `@return {Type}`      | (or `@returns`) Describes the return value's type and meaning.                         |
| `@throws {ErrorType}` | Describes possible error types and their causes.                                       |
| `@deprecated`         | If the feature is obsolete, explain why and what to use instead.                       |
| `@example`            | Provides a code usage example.                                                         |

## 3. Examples

### A. Functions & Utilities

The first line should be a brief summary. If detailed explanation is needed, add a blank line before it.

```typescript
/**
 * 計算購物車的總金額，並包含稅率運算。
 *
 * 此函式會自動過濾掉無效的商品項目，並應用當前的優惠券折扣。
 *
 * @param {CartItem[]} items - 購物車內的商品列表
 * @param {number} [taxRate=0.05] - 稅率 (預設為 5%)
 * @param {string} [couponCode] - (選填) 優惠券代碼
 * @return {number} 計算後的最終金額 (四捨五入至小數點後兩位)
 * @throws {ValidationError} 當商品列表為空時拋出錯誤
 */
export const calculateTotal = (items: CartItem[], taxRate: number = 0.05, couponCode?: string): number => {
    // ...
};
```

### B. React Components

Must clearly describe the component's responsibility and its Props.

```tsx
/**
 * 使用者個人資料卡片元件。
 *
 * 負責顯示使用者的頭像、名稱以及簡介。
 * 點擊卡片時會觸發導航至使用者詳情頁面。
 *
 * @param {Object} props - 元件參數
 * @param {string} props.userId - 使用者唯一識別碼
 * @param {string} props.name - 顯示名稱
 * @param {string} [props.avatarUrl] - (選填) 頭像圖片網址，若無則顯示預設圖
 * @param {() => void} [props.onClick] - (選填) 點擊卡片時的回呼函式
 */
export const UserProfileCard = ({ userId, name, avatarUrl, onClick }: UserProfileCardProps): => {
    // ...
};
```

### C. Interfaces & Types

Each property should have a single-line description above it.

```typescript
/**
 * 定義 API 回傳的標準錯誤格式
 */
export interface ApiErrorResponse {
    /** 錯誤代碼 (如: 404, 500) */
    code: number;
    /** 給使用者看的錯誤訊息 (繁體中文) */
    message: string;
    /** 除錯用的詳細堆疊資訊 (僅在開發環境回傳) */
    stack?: string;
}
```

## 4. Execution Checklist

After generating code, verify:

- [ ] Is the JSDoc comment directly above the code it documents?
- [ ] Do parameter names match the actual code?
- [ ] Is the descriptive text fluent and in Traditional Chinese?
