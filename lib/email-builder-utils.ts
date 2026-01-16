import { nanoid } from "nanoid";
import type {
  EmailBlock,
  HeadingBlock,
  TextBlock,
  ImageBlock,
  ButtonBlock,
  HeaderBlock,
  ColumnsBlock,
  DividerBlock,
  SpacerBlock,
  SocialLinksBlock,
  FooterBlock,
  BlockType,
} from "@/types/email-builder";
import { createEmptyContent } from "./tiptap-react-email-renderer";

/**
 * Creates a new email block with minimal defaults.
 * Color/style properties are intentionally NOT set so the design system can apply.
 */
export function createBlock(type: BlockType): EmailBlock {
  const id = nanoid();

  switch (type) {
    case "heading":
      return {
        id,
        type: "heading",
        content: createEmptyContent("Your Heading Here"),
        level: 1,
        align: "center",
        // color is NOT set - will come from design system
      } as HeadingBlock;

    case "text":
      return {
        id,
        type: "text",
        content: createEmptyContent(
          "Enter your text here. You can style this text using the properties panel."
        ),
        align: "center",
        // color is NOT set - will come from design system
      } as TextBlock;

    case "image":
      return {
        id,
        type: "image",
        src: "",
        alt: "Image description",
        width: 600,
        height: 300,
        align: "center",
      } as ImageBlock;

    case "button":
      return {
        id,
        type: "button",
        text: "Click Here",
        url: "#",
        // backgroundColor, textColor, borderRadius NOT set - from design system
        align: "center",
      } as ButtonBlock;

    case "header":
      return {
        id,
        type: "header",
        logoSrc: "",
        brandName: "Your Brand",
        showBadge: true,
      } as HeaderBlock;

    case "columns":
      return {
        id,
        type: "columns",
        columns: 2,
        gap: 16,
        content: [[], []],
      } as ColumnsBlock;

    case "divider":
      return {
        id,
        type: "divider",
        // color, thickness, style NOT set - from design system
      } as DividerBlock;

    case "spacer":
      return {
        id,
        type: "spacer",
        height: 32,
      } as SpacerBlock;

    case "social-links":
      return {
        id,
        type: "social-links",
        links: [
          { platform: "twitter", url: "https://twitter.com" },
          { platform: "facebook", url: "https://facebook.com" },
          { platform: "instagram", url: "https://instagram.com" },
        ],
        iconSize: 24,
        align: "center",
      } as SocialLinksBlock;

    case "footer":
      return {
        id,
        type: "footer",
        content: createEmptyContent(
          "© 2026 Your Company. All rights reserved.\nUnsubscribe | Privacy Policy"
        ),
        align: "center",
        // color is NOT set - will come from design system
      } as FooterBlock;

    case "list":
      return {
        id,
        type: "list",
        content: {
          type: "doc",
          content: [
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "List item 1" }],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "List item 2" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        listType: "bullet",
        // color is NOT set - will come from design system
      };

    case "blockquote":
      return {
        id,
        type: "blockquote",
        content: {
          type: "doc",
          content: [
            {
              type: "blockquote",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Your quoted text here..." }],
                },
              ],
            },
          ],
        },
        // color is NOT set - will come from design system
      };

    default:
      throw new Error(`Unknown block type: ${type}`);
  }
}
