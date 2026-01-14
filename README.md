# Email Builder Prototype

A drag-and-drop email builder using **Tiptap** for rich text editing and **React Email** for generating email-client-compatible HTML.

## Goal

Prove that **Tiptap and React Email can work together**:

- **Tiptap** → WYSIWYG editing (inline rich text)
- **React Email** → Export to email-safe HTML

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
├── app/
│   └── page.tsx                    # Entry point (renders EmailBuilder)
│
├── components/email-builder/       # Core email builder UI
│   ├── email-builder.tsx           # Main component, state management
│   ├── header.tsx                  # Top bar: preview, export buttons
│   ├── elements-sidebar.tsx        # Left panel: block palette
│   ├── email-canvas.tsx            # Center: preview area
│   ├── block-renderer.tsx          # Renders each block type visually
│   ├── properties-panel.tsx        # Right panel: block settings
│   ├── tiptap-editor.tsx           # Rich text editor (Tiptap)
│   └── social-icon.tsx             # Social media icons
│
├── lib/                            # Utilities & React Email
│   ├── email-template.tsx          # React Email component (block → JSX)
│   ├── email-renderer.tsx          # Export functions (HTML & template)
│   ├── email-builder-utils.ts      # Block factory (createBlock)
│   └── utils.ts                    # General utilities (cn)
│
└── types/
    └── email-builder.ts            # TypeScript types for all blocks
```

---

## Key Files Explained

### Editing Layer (Tiptap)

| File                                                                | Purpose                                                    |
| ------------------------------------------------------------------- | ---------------------------------------------------------- |
| [`tiptap-editor.tsx`](components/email-builder/tiptap-editor.tsx)   | Rich text editor with toolbar (bold, italic, links, lists) |
| [`block-renderer.tsx`](components/email-builder/block-renderer.tsx) | Visual rendering of blocks in the canvas                   |

### Export Layer (React Email)

| File                                           | Purpose                                                                     |
| ---------------------------------------------- | --------------------------------------------------------------------------- |
| [`email-template.tsx`](lib/email-template.tsx) | Maps blocks → React Email components (`<Html>`, `<Button>`, `<Text>`, etc.) |
| [`email-renderer.tsx`](lib/email-renderer.tsx) | `renderEmailToHtml()` and `generateEmailTemplateCode()` functions           |

### State & Types

| File                                                              | Purpose                                                           |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`email-builder.tsx`](components/email-builder/email-builder.tsx) | Main state: blocks, history, undo/redo                            |
| [`email-builder.ts`](types/email-builder.ts)                      | TypeScript interfaces: `EmailBlock`, `EmailDocument`, `BlockType` |

---

## Export Options

| Button                            | Output       | Use Case                               |
| --------------------------------- | ------------ | -------------------------------------- |
| **Export → HTML**                 | `.html` file | Send via email service, paste into ESP |
| **Export → React Email Template** | `.tsx` file  | Reusable component for codebase        |

---

## What Was Fixed

### Problem (Before)

- `@react-email/components` was installed but **never used**
- 379 lines of manual HTML string templates in `lib/react-email-generator.tsx`
- No actual React Email benefits (dark mode, Outlook compat)

### Solution (After)

- **Deleted**: `lib/react-email-generator.tsx`
- **Created**: `lib/email-template.tsx` using actual `@react-email/components`:
  ```tsx
  import { Html, Body, Container, Text, Button } from "@react-email/components";
  ```
- **Created**: `lib/email-renderer.tsx` with `render()` from `@react-email/render`

---

## Architecture

```
┌────────────────────────────────────────┐
│           User Edits in UI             │
│                                        │
│  Tiptap Editor ←→ Block JSON State     │
│  (tiptap-editor.tsx)   (email-builder) │
└────────────────────┬───────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌─────────────────┐   ┌────────────────────┐
│  Export HTML    │   │ Export Template    │
│                 │   │                    │
│ email-template  │   │ generateEmailCode  │
│ + render()      │   │ → .tsx string      │
│ → .html file    │   │                    │
└─────────────────┘   └────────────────────┘
```

---

## Tech Stack

- **Next.js 16** — React framework
- **Tiptap** — Rich text editor
- **React Email** — Email-compatible HTML generation
- **Radix UI** — Accessible components (tabs, dropdowns)
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety
