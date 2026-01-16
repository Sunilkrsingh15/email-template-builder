import type { JSONContent } from "@tiptap/core";

export type BlockType =
  | "heading"
  | "text"
  | "image"
  | "button"
  | "header"
  | "columns"
  | "divider"
  | "spacer"
  | "social-links"
  | "footer"
  | "list"
  | "blockquote";

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  content: JSONContent;
  level: 1 | 2 | 3;
  align: "left" | "center" | "right";
  /** Optional override - if not set, uses design system */
  color?: string;
}

export interface TextBlock extends BaseBlock {
  type: "text";
  content: JSONContent;
  align: "left" | "center" | "right";
  /** Optional override - if not set, uses design system */
  color?: string;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  align: "left" | "center" | "right";
}

export interface ButtonBlock extends BaseBlock {
  type: "button";
  text: string;
  url: string;
  /** Optional override - if not set, uses design system */
  backgroundColor?: string;
  /** Optional override - if not set, uses design system */
  textColor?: string;
  /** Optional override - if not set, uses design system */
  borderRadius?: number;
  align: "left" | "center" | "right";
}

export interface HeaderBlock extends BaseBlock {
  type: "header";
  logoSrc: string;
  brandName: string;
  showBadge: boolean;
}

export interface ColumnsBlock extends BaseBlock {
  type: "columns";
  columns: 2 | 3;
  gap: number;
  content: EmailBlock[][];
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
  /** Optional override - if not set, uses design system */
  color?: string;
  /** Optional override - if not set, uses design system */
  thickness?: number;
  /** Optional override - if not set, uses design system */
  style?: "solid" | "dashed" | "dotted";
}

export interface SpacerBlock extends BaseBlock {
  type: "spacer";
  height: number;
}

export interface SocialLink {
  platform: "twitter" | "facebook" | "instagram" | "linkedin" | "youtube";
  url: string;
}

export interface SocialLinksBlock extends BaseBlock {
  type: "social-links";
  links: SocialLink[];
  iconSize: number;
  align: "left" | "center" | "right";
}

export interface FooterBlock extends BaseBlock {
  type: "footer";
  content: JSONContent;
  align: "left" | "center" | "right";
  /** Optional override - if not set, uses design system */
  color?: string;
}

export interface ListBlock extends BaseBlock {
  type: "list";
  content: JSONContent;
  listType: "bullet" | "ordered";
  /** Optional override - if not set, uses design system */
  color?: string;
}

export interface BlockquoteBlock extends BaseBlock {
  type: "blockquote";
  content: JSONContent;
  /** Optional override - if not set, uses design system */
  color?: string;
}

export type EmailBlock =
  | HeadingBlock
  | TextBlock
  | ImageBlock
  | ButtonBlock
  | HeaderBlock
  | ColumnsBlock
  | DividerBlock
  | SpacerBlock
  | SocialLinksBlock
  | FooterBlock
  | ListBlock
  | BlockquoteBlock;

export interface EmailDocument {
  name: string;
  blocks: EmailBlock[];
  /** ID of the active design system, if any */
  designSystemId?: string;
  settings: {
    backgroundColor: string;
    contentWidth: number;
    previewText?: string;
  };
}
