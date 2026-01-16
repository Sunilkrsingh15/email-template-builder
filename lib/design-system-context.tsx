"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type {
  DesignSystem,
  DesignSystemTokens,
  PartialDesignSystemTokens,
} from "@/types/design-system";
import type { EmailBlock } from "@/types/email-builder";
import {
  PRESET_DESIGN_SYSTEMS,
  DEFAULT_TOKENS,
  createDesignSystem,
} from "./design-system-presets";

const STORAGE_KEY = "email-builder-design-systems";

/**
 * Resolved styles for a block, combining design system tokens with block overrides.
 */
export interface ResolvedBlockStyles {
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: string;
  borderRadius?: number;
  borderColor?: string;
  thickness?: number;
  style?: "solid" | "dashed" | "dotted";
}

interface DesignSystemContextValue {
  /** All available design systems (presets + user-created) */
  designSystems: DesignSystem[];

  /** Currently active design system */
  activeDesignSystem: DesignSystem | null;

  /** ID of active design system */
  activeDesignSystemId: string | null;

  /** Set the active design system by ID */
  setActiveDesignSystemId: (id: string | null) => void;

  /** Create a new user design system */
  createUserDesignSystem: (name: string) => DesignSystem;

  /** Update an existing design system */
  updateDesignSystem: (
    id: string,
    updates: { name?: string; tokens?: PartialDesignSystemTokens }
  ) => void;

  /** Delete a user design system (presets cannot be deleted) */
  deleteDesignSystem: (id: string) => void;

  /** Duplicate an existing design system */
  duplicateDesignSystem: (id: string) => DesignSystem | null;

  /** Resolve block styles by merging design system tokens with block overrides */
  resolveBlockStyles: (block: EmailBlock) => ResolvedBlockStyles;

  /** Get default tokens (used when no design system is active) */
  defaultTokens: DesignSystemTokens;
}

const DesignSystemContext = createContext<DesignSystemContextValue | null>(
  null
);

/**
 * Hook to access design system context.
 * Must be used within a DesignSystemProvider.
 */
export function useDesignSystem(): DesignSystemContextValue {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error(
      "useDesignSystem must be used within a DesignSystemProvider"
    );
  }
  return context;
}

interface DesignSystemProviderProps {
  children: ReactNode;
}

/**
 * Provider component for design system state management.
 * Persists user-created design systems to localStorage.
 */
export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  // User-created design systems (persisted to localStorage)
  const [userDesignSystems, setUserDesignSystems] = useState<DesignSystem[]>(
    []
  );

  // Active design system ID
  const [activeDesignSystemId, setActiveDesignSystemId] = useState<
    string | null
  >(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as DesignSystem[];
        setUserDesignSystems(parsed);
      }
    } catch {
      // Ignore parse errors, start fresh
    }
  }, []);

  // Persist to localStorage when user design systems change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userDesignSystems));
    } catch {
      // Ignore storage errors (quota exceeded, etc.)
    }
  }, [userDesignSystems]);

  // Combine presets and user design systems
  const designSystems = useMemo(
    () => [...PRESET_DESIGN_SYSTEMS, ...userDesignSystems],
    [userDesignSystems]
  );

  // Find active design system
  const activeDesignSystem = useMemo(() => {
    if (!activeDesignSystemId) return null;
    return designSystems.find((ds) => ds.id === activeDesignSystemId) ?? null;
  }, [designSystems, activeDesignSystemId]);

  // Create a new user design system
  const createUserDesignSystem = useCallback((name: string): DesignSystem => {
    const newDS = createDesignSystem(name);
    setUserDesignSystems((prev) => [...prev, newDS]);
    return newDS;
  }, []);

  // Update an existing design system
  const updateDesignSystem = useCallback(
    (
      id: string,
      updates: { name?: string; tokens?: PartialDesignSystemTokens }
    ) => {
      // Check if it's a preset (cannot modify)
      if (PRESET_DESIGN_SYSTEMS.some((p) => p.id === id)) {
        console.warn("Cannot modify preset design systems");
        return;
      }

      setUserDesignSystems((prev) =>
        prev.map((ds) => {
          if (ds.id !== id) return ds;

          const updatedTokens = updates.tokens
            ? mergeTokens(ds.tokens, updates.tokens)
            : ds.tokens;

          return {
            ...ds,
            name: updates.name ?? ds.name,
            tokens: updatedTokens,
            updatedAt: Date.now(),
          };
        })
      );
    },
    []
  );

  // Delete a user design system
  const deleteDesignSystem = useCallback(
    (id: string) => {
      // Check if it's a preset (cannot delete)
      if (PRESET_DESIGN_SYSTEMS.some((p) => p.id === id)) {
        console.warn("Cannot delete preset design systems");
        return;
      }

      setUserDesignSystems((prev) => prev.filter((ds) => ds.id !== id));

      // Clear active if deleting the active one
      if (activeDesignSystemId === id) {
        setActiveDesignSystemId(null);
      }
    },
    [activeDesignSystemId]
  );

  // Duplicate a design system
  const duplicateDesignSystem = useCallback(
    (id: string): DesignSystem | null => {
      const source = designSystems.find((ds) => ds.id === id);
      if (!source) return null;

      const now = Date.now();
      const duplicate = createDesignSystem(`${source.name} (Copy)`);
      duplicate.tokens = JSON.parse(JSON.stringify(source.tokens));
      duplicate.createdAt = now;
      duplicate.updatedAt = now;

      setUserDesignSystems((prev) => [...prev, duplicate]);
      return duplicate;
    },
    [designSystems]
  );

  // Resolve block styles by merging design system tokens with block properties
  const resolveBlockStyles = useCallback(
    (block: EmailBlock): ResolvedBlockStyles => {
      const tokens = activeDesignSystem?.tokens ?? DEFAULT_TOKENS;

      // Map block type to relevant tokens
      switch (block.type) {
        case "heading":
          return {
            color: block.color ?? tokens.heading.color,
            fontFamily: tokens.heading.fontFamily,
            fontWeight: tokens.heading.fontWeight,
          };

        case "text":
          return {
            color: block.color ?? tokens.text.color,
            fontFamily: tokens.text.fontFamily,
            fontSize: tokens.text.fontSize,
            lineHeight: tokens.text.lineHeight,
          };

        case "button":
          return {
            backgroundColor:
              block.backgroundColor ?? tokens.button.backgroundColor,
            textColor: block.textColor ?? tokens.button.textColor,
            borderRadius: block.borderRadius ?? tokens.button.borderRadius,
            fontFamily: tokens.button.fontFamily,
          };

        case "divider":
          return {
            color: block.color ?? tokens.divider.color,
            thickness: block.thickness ?? tokens.divider.thickness,
            style: block.style ?? tokens.divider.style,
          };

        case "footer":
          return {
            color: block.color ?? tokens.footer.color,
            fontFamily: tokens.footer.fontFamily,
            fontSize: tokens.footer.fontSize,
          };

        case "list":
          return {
            color: block.color ?? tokens.list.color,
            fontFamily: tokens.list.fontFamily,
          };

        case "blockquote":
          return {
            color: block.color ?? tokens.blockquote.color,
            borderColor: tokens.blockquote.borderColor,
            fontFamily: tokens.blockquote.fontFamily,
          };

        default:
          return {};
      }
    },
    [activeDesignSystem]
  );

  const value: DesignSystemContextValue = useMemo(
    () => ({
      designSystems,
      activeDesignSystem,
      activeDesignSystemId,
      setActiveDesignSystemId,
      createUserDesignSystem,
      updateDesignSystem,
      deleteDesignSystem,
      duplicateDesignSystem,
      resolveBlockStyles,
      defaultTokens: DEFAULT_TOKENS,
    }),
    [
      designSystems,
      activeDesignSystem,
      activeDesignSystemId,
      createUserDesignSystem,
      updateDesignSystem,
      deleteDesignSystem,
      duplicateDesignSystem,
      resolveBlockStyles,
    ]
  );

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}

/**
 * Deep merge partial tokens into existing tokens.
 */
function mergeTokens(
  existing: DesignSystemTokens,
  updates: PartialDesignSystemTokens
): DesignSystemTokens {
  const result = { ...existing };

  for (const key of Object.keys(updates) as Array<keyof DesignSystemTokens>) {
    const update = updates[key];
    if (update) {
      // Use Object.assign for a shallow merge that TypeScript can understand
      (result as Record<string, unknown>)[key] = {
        ...existing[key],
        ...update,
      };
    }
  }

  return result;
}
