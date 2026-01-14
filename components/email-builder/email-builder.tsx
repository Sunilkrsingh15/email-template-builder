"use client";

import { useState, useCallback } from "react";
import { EmailBuilderHeader } from "./header";
import { ElementsSidebar } from "./elements-sidebar";
import { EmailCanvas } from "./email-canvas";
import { PropertiesPanel } from "./properties-panel";
import type {
  EmailBlock,
  EmailDocument,
  BlockType,
} from "@/types/email-builder";
import { createBlock } from "@/lib/email-builder-utils";

const initialDocument: EmailDocument = {
  name: "Untitled Email",
  blocks: [],
  settings: {
    backgroundColor: "#f3f4f6",
    contentWidth: 600,
  },
};

export function EmailBuilder() {
  const [document, setDocument] = useState<EmailDocument>(initialDocument);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [simulateMode, setSimulateMode] = useState<"light" | "dark">("light");
  const [history, setHistory] = useState<EmailDocument[]>([initialDocument]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const selectedBlock =
    document.blocks.find((b) => b.id === selectedBlockId) || null;

  const pushHistory = useCallback(
    (newDoc: EmailDocument) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        return [...newHistory, newDoc];
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const handleAddBlock = useCallback(
    (type: BlockType) => {
      const newBlock = createBlock(type);
      const newDoc = {
        ...document,
        blocks: [...document.blocks, newBlock],
      };
      setDocument(newDoc);
      pushHistory(newDoc);
      setSelectedBlockId(newBlock.id);
    },
    [document, pushHistory]
  );

  const handleUpdateBlock = useCallback(
    (blockId: string, updates: Partial<EmailBlock>) => {
      const newDoc = {
        ...document,
        blocks: document.blocks.map((block) =>
          block.id === blockId ? { ...block, ...updates } : block
        ) as EmailBlock[],
      };
      setDocument(newDoc);
      // Don't push history on every keystroke for performance
    },
    [document]
  );

  const handleUpdateBlockWithHistory = useCallback(
    (blockId: string, updates: Partial<EmailBlock>) => {
      const newDoc = {
        ...document,
        blocks: document.blocks.map((block) =>
          block.id === blockId ? { ...block, ...updates } : block
        ) as EmailBlock[],
      };
      setDocument(newDoc);
      pushHistory(newDoc);
    },
    [document, pushHistory]
  );

  const handleDeleteBlock = useCallback(
    (blockId: string) => {
      const newDoc = {
        ...document,
        blocks: document.blocks.filter((b) => b.id !== blockId),
      };
      setDocument(newDoc);
      pushHistory(newDoc);
      if (selectedBlockId === blockId) {
        setSelectedBlockId(null);
      }
    },
    [document, pushHistory, selectedBlockId]
  );

  const handleMoveBlock = useCallback(
    (blockId: string, direction: "up" | "down") => {
      const index = document.blocks.findIndex((b) => b.id === blockId);
      if (index === -1) return;
      if (direction === "up" && index === 0) return;
      if (direction === "down" && index === document.blocks.length - 1) return;

      const newBlocks = [...document.blocks];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      [newBlocks[index], newBlocks[targetIndex]] = [
        newBlocks[targetIndex],
        newBlocks[index],
      ];

      const newDoc = { ...document, blocks: newBlocks };
      setDocument(newDoc);
      pushHistory(newDoc);
    },
    [document, pushHistory]
  );

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDocument(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDocument(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const handleNameChange = useCallback(
    (name: string) => {
      const newDoc = { ...document, name };
      setDocument(newDoc);
    },
    [document]
  );

  return (
    <div className="flex h-screen flex-col bg-background">
      <EmailBuilderHeader
        documentName={document.name}
        onNameChange={handleNameChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        simulateMode={simulateMode}
        onSimulateModeChange={setSimulateMode}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        document={document}
      />
      <div className="flex flex-1 overflow-hidden">
        <ElementsSidebar onAddBlock={handleAddBlock} />
        <EmailCanvas
          document={document}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onDeleteBlock={handleDeleteBlock}
          onMoveBlock={handleMoveBlock}
          onUpdateBlock={handleUpdateBlock}
          viewMode={viewMode}
          simulateMode={simulateMode}
        />
        <PropertiesPanel
          selectedBlock={selectedBlock}
          onUpdateBlock={handleUpdateBlockWithHistory}
        />
      </div>
    </div>
  );
}
