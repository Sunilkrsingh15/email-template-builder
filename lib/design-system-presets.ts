import type { DesignSystem, DesignSystemTokens } from "@/types/design-system";
import { nanoid } from "nanoid";

/**
 * Default token values used when no design system is selected.
 * These match the current hardcoded values in the codebase.
 */
export const DEFAULT_TOKENS: DesignSystemTokens = {
  heading: {
    color: "#000000",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "700",
  },
  text: {
    color: "#374151",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 16,
    lineHeight: 1.6,
  },
  button: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    borderRadius: 4,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  divider: {
    color: "#e5e7eb",
    thickness: 1,
    style: "solid",
  },
  footer: {
    color: "#6b7280",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 14,
  },
  list: {
    color: "#374151",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  blockquote: {
    color: "#6b7280",
    borderColor: "#e5e7eb",
    fontFamily: "Georgia, Times New Roman, serif",
  },
  global: {
    backgroundColor: "#f3f4f6",
    contentWidth: 600,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
};

/**
 * Built-in design system presets.
 * These are read-only and always available.
 */
export const PRESET_DESIGN_SYSTEMS: DesignSystem[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    tokens: {
      heading: {
        color: "#111827",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: "600",
      },
      text: {
        color: "#374151",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 16,
        lineHeight: 1.7,
      },
      button: {
        backgroundColor: "#111827",
        textColor: "#ffffff",
        borderRadius: 6,
        fontFamily: "Arial, Helvetica, sans-serif",
      },
      divider: {
        color: "#e5e7eb",
        thickness: 1,
        style: "solid",
      },
      footer: {
        color: "#9ca3af",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 12,
      },
      list: {
        color: "#374151",
        fontFamily: "Arial, Helvetica, sans-serif",
      },
      blockquote: {
        color: "#6b7280",
        borderColor: "#d1d5db",
        fontFamily: "Georgia, Times New Roman, serif",
      },
      global: {
        backgroundColor: "#ffffff",
        contentWidth: 600,
        fontFamily: "Arial, Helvetica, sans-serif",
      },
    },
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: "bold-corporate",
    name: "Bold Corporate",
    tokens: {
      heading: {
        color: "#1e3a8a",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: "800",
      },
      text: {
        color: "#1f2937",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 16,
        lineHeight: 1.6,
      },
      button: {
        backgroundColor: "#2563eb",
        textColor: "#ffffff",
        borderRadius: 4,
        fontFamily: "Arial, Helvetica, sans-serif",
      },
      divider: {
        color: "#3b82f6",
        thickness: 2,
        style: "solid",
      },
      footer: {
        color: "#6b7280",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 12,
      },
      list: {
        color: "#1f2937",
        fontFamily: "Arial, Helvetica, sans-serif",
      },
      blockquote: {
        color: "#1e40af",
        borderColor: "#3b82f6",
        fontFamily: "Georgia, Times New Roman, serif",
      },
      global: {
        backgroundColor: "#f8fafc",
        contentWidth: 600,
        fontFamily: "Arial, Helvetica, sans-serif",
      },
    },
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: "warm-friendly",
    name: "Warm & Friendly",
    tokens: {
      heading: {
        color: "#92400e",
        fontFamily: "Georgia, Times New Roman, serif",
        fontWeight: "700",
      },
      text: {
        color: "#78350f",
        fontFamily: "Georgia, Times New Roman, serif",
        fontSize: 17,
        lineHeight: 1.8,
      },
      button: {
        backgroundColor: "#f59e0b",
        textColor: "#78350f",
        borderRadius: 24,
        fontFamily: "Georgia, Times New Roman, serif",
      },
      divider: {
        color: "#fcd34d",
        thickness: 1,
        style: "dashed",
      },
      footer: {
        color: "#a16207",
        fontFamily: "Georgia, Times New Roman, serif",
        fontSize: 13,
      },
      list: {
        color: "#78350f",
        fontFamily: "Georgia, Times New Roman, serif",
      },
      blockquote: {
        color: "#92400e",
        borderColor: "#fbbf24",
        fontFamily: "Georgia, Times New Roman, serif",
      },
      global: {
        backgroundColor: "#fffbeb",
        contentWidth: 560,
        fontFamily: "Georgia, Times New Roman, serif",
      },
    },
    createdAt: 0,
    updatedAt: 0,
  },
];

/**
 * Creates a new empty design system with default tokens.
 */
export function createDesignSystem(name: string): DesignSystem {
  const now = Date.now();
  return {
    id: nanoid(),
    name,
    tokens: { ...DEFAULT_TOKENS },
    createdAt: now,
    updatedAt: now,
  };
}
