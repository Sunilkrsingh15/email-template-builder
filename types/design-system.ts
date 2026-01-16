/**
 * Design System / Brand Kit Types
 *
 * A design system defines styling tokens for all email block types,
 * enabling consistent branding across templates.
 */

/** Email-safe font families with web fallbacks */
export type EmailFontFamily =
  | "Arial, Helvetica, sans-serif"
  | "Georgia, Times New Roman, serif"
  | "Verdana, Geneva, sans-serif"
  | "Trebuchet MS, sans-serif"
  | "Courier New, monospace"
  | "Tahoma, sans-serif";

/** Font weight options for headings */
export type FontWeight = "400" | "500" | "600" | "700" | "800";

/** Tokens for heading blocks */
export interface HeadingTokens {
  color: string;
  fontFamily: EmailFontFamily;
  fontWeight: FontWeight;
}

/** Tokens for text/paragraph blocks */
export interface TextTokens {
  color: string;
  fontFamily: EmailFontFamily;
  fontSize: number;
  lineHeight: number;
}

/** Tokens for button blocks */
export interface ButtonTokens {
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontFamily: EmailFontFamily;
}

/** Tokens for divider blocks */
export interface DividerTokens {
  color: string;
  thickness: number;
  style: "solid" | "dashed" | "dotted";
}

/** Tokens for footer blocks */
export interface FooterTokens {
  color: string;
  fontFamily: EmailFontFamily;
  fontSize: number;
}

/** Tokens for list blocks */
export interface ListTokens {
  color: string;
  fontFamily: EmailFontFamily;
}

/** Tokens for blockquote blocks */
export interface BlockquoteTokens {
  color: string;
  borderColor: string;
  fontFamily: EmailFontFamily;
}

/** Global tokens applied to email container */
export interface GlobalTokens {
  backgroundColor: string;
  contentWidth: number;
  fontFamily: EmailFontFamily;
}

/** Complete token set for a design system */
export interface DesignSystemTokens {
  heading: HeadingTokens;
  text: TextTokens;
  button: ButtonTokens;
  divider: DividerTokens;
  footer: FooterTokens;
  list: ListTokens;
  blockquote: BlockquoteTokens;
  global: GlobalTokens;
}

/** A complete design system definition */
export interface DesignSystem {
  id: string;
  name: string;
  tokens: DesignSystemTokens;
  createdAt: number;
  updatedAt: number;
}

/** Partial tokens for updating specific block types */
export type PartialDesignSystemTokens = {
  [K in keyof DesignSystemTokens]?: Partial<DesignSystemTokens[K]>;
};
