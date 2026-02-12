---
name: nextjs-docs-lookup
description: Activated when answering Next.js questions or writing Next.js code. Forces lookup via https://nextjs.org/sitemap.xml to locate official documentation, ensuring accuracy.
---

# Next.js Official Documentation Lookup Guide

You are working in a Next.js project. To ensure **absolute accuracy**, you must follow this "lookup-first" workflow.

> 📚 **Primary Resources**:
>
> - Sitemap: `https://nextjs.org/sitemap.xml`
> - Official Docs: `https://nextjs.org/docs`

---

## Core Workflow

After receiving a user question, you **must** execute the following steps in order:

### Step 1: Sitemap Path Lookup

1. Fetch `https://nextjs.org/sitemap.xml`
2. Find the `<loc>` URLs most relevant to the user's question
3. **Priority rules**:
    - Prefer paths containing `/docs/app/` (App Router)
    - Only choose `/docs/pages/` paths if the question explicitly targets Pages Router
    - If both apply, prioritize App Router

### Step 2: Read & Extract

1. Read the URL content found in Step 1
2. Locate paragraphs relevant to the question
3. Mark official definitions or code that need to be cited

### Step 3: Construct Response

Respond based on the retrieved content following the "Response Rules" below.

---

## Response Rules

### 1. Exact Verbatim Quotes (Highest Priority)

You must treat official definitions as **immutable strings**:

| Type     | Format                        | Requirement                                      |
| -------- | ----------------------------- | ------------------------------------------------ |
| **Text** | Use `>` blockquote            | Do not modify punctuation, line breaks, or words |
| **Code** | Use Code Block + `typescript` | Preserve original formatting                     |

> **Verification Standard**: If the user copies your quoted text and searches on that page, they must find a 100% matching paragraph.

### 2. Source Attribution

Every time you cite official documentation, provide the source link in your response:

```
> [Official documentation content...]
>
> Source: [Page Title](https://nextjs.org/docs/...)
```

### 3. Code Example Standards

If providing code examples, you must use TypeScript with Google Style Traditional Chinese JSDoc comments (refer to `jsdoc-convention` rule):

```typescript
/**
 * 根據路徑參數動態生成 Metadata
 *
 * @param {Props} props - 頁面參數
 * @return {Promise<Metadata>} 符合 Next.js 規範的 Metadata 物件
 */
export const generateMetadata = async (props: Props): Promise<Metadata> => {
    // ...
};
```

---

## Failure Handling

When no relevant official documentation can be found:

### Scenario A: No Related Page in Sitemap

1. Tell the user: "No directly relevant information was found in the Next.js official documentation."
2. Provide links to the closest alternative pages
3. Offer suggestions based on general React/JavaScript knowledge, but explicitly note "This is not from official documentation"

### Scenario B: Page Exists but Content Is Insufficient

1. Quote the available content
2. Supplement with other resources that may need to be consulted (e.g., GitHub Issues, RFCs)
3. Suggest the user check the Next.js GitHub Discussions

---

## Common Question Types & Recommended Paths

| Question Type | Recommended Lookup Path                             |
| ------------- | --------------------------------------------------- |
| Routing       | `/docs/app/building-your-application/routing`       |
| Data Fetching | `/docs/app/building-your-application/data-fetching` |
| Rendering     | `/docs/app/building-your-application/rendering`     |
| Caching       | `/docs/app/building-your-application/caching`       |
| Styling       | `/docs/app/building-your-application/styling`       |
| Optimizing    | `/docs/app/building-your-application/optimizing`    |
| API Reference | `/docs/app/api-reference`                           |
