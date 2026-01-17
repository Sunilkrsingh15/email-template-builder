# Email Template Builder

<div align="left">

**Visual Email Builder** — Tiptap × React Email × Next.js

[![Live Site](https://img.shields.io/badge/Live_Site-email--template--builder--prototype.vercel.app-000000?style=for-the-badge)](https://email-template-builder-prototype.vercel.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge&logo=opensourceinitiative&logoColor=black)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

</div>

> A drag-and-drop email builder that combines **Tiptap** for rich-text editing with **React Email** for generating cross-client compatible HTML. Build beautiful, responsive emails visually—export as HTML or reusable React Email templates.

## What is Email Template Builder?

Email Template Builder is a visual editor for creating professional email templates. Instead of writing HTML by hand or using limited drag-and-drop tools, you get:

- **Visual block editor** — Compose emails with drag-and-drop blocks
- **Rich text editing** — Full formatting powered by Tiptap
- **Dark mode preview** — Emulates email client color inversion (React Email 5.0)
- **Design systems** — Apply consistent brand styles across templates
- **Export HTML** — Download for any email service
- **Export React Email** — Generate `.tsx` templates for code-based workflows

**[Try it live →](https://email-template-builder-prototype.vercel.app/)**

## Screenshots

**Light Mode**

<div align="center">

![Light Mode](https://typyu7utis.ufs.sh/f/qwt9jODAgVXY9qd76MCCg40WsHEVu5iLxUrXJ27MlDR8vF6m)

</div>

**Dark Mode** — React Email 5.0 emulates email client color inversion

<div align="center">

![Dark Mode](https://typyu7utis.ufs.sh/f/qwt9jODAgVXYJJGQ4SicBaPFT1OfYuKZrvnHm4WdQze8RkLN)

</div>

## Architecture

| **Layer**   | **Technology**                        | **Purpose**                                |
| :---------- | :------------------------------------ | :----------------------------------------- |
| **Editing** | Tiptap                                | WYSIWYG rich-text editor with JSON output  |
| **Preview** | @tiptap/html                          | Convert JSON to HTML for canvas display    |
| **Export**  | @tiptap/static-renderer + React Email | Map Tiptap nodes to React Email components |

```
User Edits in Tiptap
        │
        ▼
TiptapEditor → editor.getJSON() → JSONContent stored
        │
        ├──────────────────────────────────┐
        ▼                                  ▼
   Canvas Preview                    Email Export
   @tiptap/html                      @tiptap/static-renderer
   → HTML for display                → React Email components
                                     → render() → .html
```

## File Structure

```
email-template-builder/
├── app/
│   ├── layout.tsx                  # Root layout with providers
│   ├── page.tsx                    # Main entry point
│   └── globals.css                 # Global styles
├── components/
│   ├── email-builder/
│   │   ├── email-builder.tsx       # Main builder component
│   │   ├── email-canvas.tsx        # Email preview canvas
│   │   ├── block-renderer.tsx      # Block rendering logic
│   │   ├── block-picker-toolbar.tsx
│   │   ├── properties-popover.tsx  # Block property editing
│   │   ├── design-system-manager.tsx
│   │   ├── header.tsx              # Builder header/toolbar
│   │   └── tiptap-editor.tsx       # Rich text editor
│   └── ui/                         # Shadcn/ui components
├── lib/
│   ├── email-renderer.tsx          # HTML rendering
│   ├── tiptap-react-email-renderer.tsx  # ← Tiptap to React Email mapping
│   ├── email-template.tsx          # Template structure definitions
│   ├── design-system-context.tsx   # Design system state
│   └── design-system-presets.ts    # Built-in design systems
├── types/
│   └── email-builder.ts            # TypeScript definitions
└── public/
```

**Key files:**

- `lib/tiptap-react-email-renderer.tsx` — Maps Tiptap JSON nodes to React Email components
- `lib/email-template.tsx` — Defines block types and template structure
- `components/email-builder/block-renderer.tsx` — Renders blocks on canvas

## Block Types

| **Block**    | **Description**                    |
| :----------- | :--------------------------------- |
| Heading      | H1/H2/H3 with alignment and color  |
| Text         | Paragraph with full formatting     |
| Image        | Images with src, alt, dimensions   |
| Button       | CTA buttons with links and styling |
| Header       | Brand header with logo             |
| Columns      | 2 or 3 column layouts              |
| Divider      | Horizontal rules                   |
| Spacer       | Vertical spacing                   |
| Social Links | Social media icons                 |
| Footer       | Footer text with formatting        |

## Tech Stack

- **Next.js 16** with TypeScript
- **Tiptap 3.15** for rich-text editing
- **React Email 1.0** for email rendering
- **@tiptap/static-renderer** for Tiptap to React Email mapping
- **Radix UI** + **Tailwind CSS 4** for UI
- **shadcn/ui** component library

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to see the app.

## Roadmap

| **Core**                           | **Export & Preview**                   | **UX & Polish**                     |
| :--------------------------------- | :------------------------------------- | :---------------------------------- |
| `✓` Dark mode for templates/blocks | `○` Output format preview (HTML, TSX)  | `○` SVG animations for better UX    |
| `✓` Design systems picker fix      | `○` Multiple exports (PDF, SVG, image) | `○` Keyboard shortcuts (delete key) |
| `○` Move project to pnpm           | `○` `tiptap-to-react-email` package    | `○` OG tags for metadata/thumbnails |
| `○` Auth + database                | `○` All 18 React Email blocks          | `○` Real font and asset management  |
| `○` Canvas improvements            | `○` Proper email widths (standards)    |                                     |
| `○` React drag for blocks          |                                        |                                     |
| `○` Fix Column block behavior      |                                        |                                     |

| **Advanced Features**                    | **Management & Scale**             |
| :--------------------------------------- | :--------------------------------- |
| `○` Template gallery (community)         | `○` Workspace/projects management  |
| `○` AI email strategizer/mapper          | `○` Figma-derived reusable blocks  |
| `○` i18n (multiple languages)            | `○` Template branching/variants    |
| `○` Auto brand/kit configuration         | `○` Multiple templates in one shot |
| `○` Advanced templates (carousels, GIFs) | `○` Auto design system maker       |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Contact

Built by **[@noobships](https://github.com/noobships)**

[![Email](https://img.shields.io/badge/Email-creativecoder.crco@gmail.com-000000?style=for-the-badge&logo=gmail&logoColor=white)](mailto:creativecoder.crco@gmail.com)
[![Issues](https://img.shields.io/badge/Feedback-Open_an_Issue-white?style=for-the-badge&logo=github&logoColor=black)](https://github.com/noobships/email-template-builder/issues)

## License

MIT License - use it however you want.
