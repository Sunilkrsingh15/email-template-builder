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
import { nanoid } from "nanoid";
import type { EmailDocument } from "@/types/email-builder";

const STORAGE_KEY = "email-builder-templates";

/**
 * Saved template with metadata for history tracking.
 */
export interface SavedTemplate {
  id: string;
  name: string;
  document: EmailDocument;
  createdAt: number;
  updatedAt: number;
}

interface TemplateStorageContextValue {
  /** All saved templates */
  templates: SavedTemplate[];

  /** ID of currently loaded template (null for new/unsaved) */
  currentTemplateId: string | null;

  /** Save or update the current template, returns template ID */
  saveTemplate: (doc: EmailDocument) => string;

  /** Load a template by ID */
  loadTemplate: (id: string) => EmailDocument | null;

  /** Delete a template by ID */
  deleteTemplate: (id: string) => void;

  /** Reset to a new blank template */
  createNewTemplate: () => void;

  /** Set the current template ID (used when loading) */
  setCurrentTemplateId: (id: string | null) => void;
}

const TemplateStorageContext =
  createContext<TemplateStorageContextValue | null>(null);

/**
 * Hook to access template storage context.
 * Must be used within a TemplateStorageProvider.
 */
export function useTemplateStorage(): TemplateStorageContextValue {
  const context = useContext(TemplateStorageContext);
  if (!context) {
    throw new Error(
      "useTemplateStorage must be used within a TemplateStorageProvider"
    );
  }
  return context;
}

interface TemplateStorageProviderProps {
  children: ReactNode;
}

/**
 * Provider component for template storage with localStorage persistence.
 * Auto-saves templates and maintains history for the History panel.
 */
export function TemplateStorageProvider({
  children,
}: TemplateStorageProviderProps) {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(
    null
  );

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SavedTemplate[];
        setTemplates(parsed);
        // Auto-load the most recently updated template
        if (parsed.length > 0) {
          const mostRecent = parsed.reduce((a, b) =>
            a.updatedAt > b.updatedAt ? a : b
          );
          setCurrentTemplateId(mostRecent.id);
        }
      }
    } catch {
      // Ignore parse errors, start fresh
    }
  }, []);

  // Persist to localStorage when templates change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    } catch {
      // Ignore storage errors (quota exceeded, etc.)
    }
  }, [templates]);

  // Save or update a template
  const saveTemplate = useCallback(
    (doc: EmailDocument): string => {
      const now = Date.now();

      // If we have a current template, update it
      if (currentTemplateId) {
        setTemplates((prev) =>
          prev.map((t) =>
            t.id === currentTemplateId
              ? { ...t, name: doc.name, document: doc, updatedAt: now }
              : t
          )
        );
        return currentTemplateId;
      }

      // Otherwise create a new template
      const newId = nanoid();
      const newTemplate: SavedTemplate = {
        id: newId,
        name: doc.name,
        document: doc,
        createdAt: now,
        updatedAt: now,
      };
      setTemplates((prev) => [...prev, newTemplate]);
      setCurrentTemplateId(newId);
      return newId;
    },
    [currentTemplateId]
  );

  // Load a template by ID
  const loadTemplate = useCallback(
    (id: string): EmailDocument | null => {
      const template = templates.find((t) => t.id === id);
      if (template) {
        setCurrentTemplateId(id);
        return template.document;
      }
      return null;
    },
    [templates]
  );

  // Delete a template by ID
  const deleteTemplate = useCallback(
    (id: string): void => {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      if (currentTemplateId === id) {
        setCurrentTemplateId(null);
      }
    },
    [currentTemplateId]
  );

  // Reset to a new blank template
  const createNewTemplate = useCallback((): void => {
    setCurrentTemplateId(null);
  }, []);

  const value: TemplateStorageContextValue = useMemo(
    () => ({
      templates,
      currentTemplateId,
      saveTemplate,
      loadTemplate,
      deleteTemplate,
      createNewTemplate,
      setCurrentTemplateId,
    }),
    [
      templates,
      currentTemplateId,
      saveTemplate,
      loadTemplate,
      deleteTemplate,
      createNewTemplate,
    ]
  );

  return (
    <TemplateStorageContext.Provider value={value}>
      {children}
    </TemplateStorageContext.Provider>
  );
}
