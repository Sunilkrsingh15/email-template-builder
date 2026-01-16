import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import {
  Text,
  Link as EmailLink,
  Heading,
  Section,
  Hr,
  Img,
  CodeBlock,
  CodeInline,
} from "@react-email/components";
import { dracula } from "@react-email/code-block";
import { emailEditorExtensions } from "./tiptap-extensions";
import type { JSONContent } from "@tiptap/core";
import type { ReactNode } from "react";

interface RenderOptions {
  textColor?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: number;
}

/**
 * Renders Tiptap JSON content to React Email components.
 *
 * This uses the static renderer with custom node/mark mappings to ensure
 * all content flows through React Email's rendering pipeline.
 *
 * @see docs/tiptap/api/utilities/static-renderer.md
 */
export function renderTiptapToReactEmail(
  content: JSONContent,
  options: RenderOptions = {}
): ReactNode {
  const { textColor, textAlign, fontSize = 16 } = options;

  return renderToReactElement({
    extensions: emailEditorExtensions,
    content,
    options: {
      nodeMapping: {
        // Map paragraph to React Email's Text component
        paragraph: ({ children }) => (
          <Text
            style={{
              color: textColor,
              textAlign: textAlign,
              fontSize,
              lineHeight: 1.6,
              margin: "0 0 8px 0",
            }}
          >
            {children}
          </Text>
        ),

        // Map heading to React Email's Heading component
        heading: ({ node, children }) => {
          const level = (node.attrs.level as 1 | 2 | 3 | 4 | 5 | 6) || 1;
          const headingSizes: Record<number, number> = {
            1: 32,
            2: 28,
            3: 24,
            4: 20,
            5: 18,
            6: 16,
          };
          return (
            <Heading
              as={`h${level}`}
              style={{
                color: textColor,
                textAlign: textAlign,
                fontSize: headingSizes[level],
                fontWeight: "bold",
                margin: "0 0 16px 0",
                lineHeight: 1.3,
              }}
            >
              {children}
            </Heading>
          );
        },

        // Map blockquote to Section with styled border
        blockquote: ({ children }) => (
          <Section
            style={{
              borderLeft: "3px solid #e5e7eb",
              paddingLeft: 16,
              margin: "0 0 16px 0",
            }}
          >
            <Text
              style={{
                fontStyle: "italic",
                color: textColor ?? "#6b7280",
                margin: 0,
              }}
            >
              {children}
            </Text>
          </Section>
        ),

        // Map codeBlock to React Email's CodeBlock component
        // Cast to 'any' since PrismLanguage has many valid values
        codeBlock: ({ node }) => {
          // Default to 'bash' which is a valid PrismLanguage
          const lang = (node.attrs.language as string) || "bash";
          return (
            <CodeBlock
              code={node.textContent || ""}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              language={lang as any}
              theme={dracula}
              style={{
                margin: "0 0 16px 0",
              }}
            />
          );
        },

        // Map image to React Email's Img component
        image: ({ node }) => (
          <Img
            src={node.attrs.src as string}
            alt={(node.attrs.alt as string) || ""}
            width={node.attrs.width as number}
            height={node.attrs.height as number}
            style={{
              display: "block",
              maxWidth: "100%",
              margin: "0 auto 16px auto",
            }}
          />
        ),

        // Map horizontalRule to React Email's Hr component
        horizontalRule: () => (
          <Hr
            style={{
              borderColor: "#e5e7eb",
              margin: "24px 0",
            }}
          />
        ),

        // Lists with inline styles (email clients don't support external CSS)
        bulletList: ({ children }) => (
          <ul
            style={{
              paddingLeft: 24,
              margin: "0 0 8px 0",
              color: textColor,
            }}
          >
            {children}
          </ul>
        ),
        orderedList: ({ children }) => (
          <ol
            style={{
              paddingLeft: 24,
              margin: "0 0 8px 0",
              color: textColor,
            }}
          >
            {children}
          </ol>
        ),
        listItem: ({ children }) => (
          <li style={{ marginBottom: 4 }}>{children}</li>
        ),

        // Hard break handling
        hardBreak: () => <br />,
      },
      markMapping: {
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <em>{children}</em>,
        underline: ({ children }) => <u>{children}</u>,
        strike: ({ children }) => <s>{children}</s>,
        link: ({ mark, children }) => (
          <EmailLink
            href={mark.attrs.href as string}
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            {children}
          </EmailLink>
        ),
        // Map code mark to React Email's CodeInline component
        code: ({ children }) => (
          <CodeInline
            style={{
              backgroundColor: "#f3f4f6",
              padding: "2px 4px",
              borderRadius: 4,
              fontFamily: "monospace",
              fontSize: "0.875em",
            }}
          >
            {children}
          </CodeInline>
        ),
      },
    },
  });
}

/**
 * Creates an empty Tiptap JSON document.
 * Use this as the default content for new blocks.
 */
export function createEmptyContent(
  text = "Enter your text here..."
): JSONContent {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text,
          },
        ],
      },
    ],
  };
}
