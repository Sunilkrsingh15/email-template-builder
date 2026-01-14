"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { BlockRenderer } from "./block-renderer";
import type { EmailDocument, EmailBlock } from "@/types/email-builder";
import { cn } from "@/lib/utils";

interface EmailCanvasProps {
  document: EmailDocument;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onDeleteBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: "up" | "down") => void;
  onUpdateBlock: (blockId: string, updates: Partial<EmailBlock>) => void;
  viewMode: "desktop" | "mobile";
  simulateMode: "light" | "dark";
}

export function EmailCanvas({
  document,
  selectedBlockId,
  onSelectBlock,
  onDeleteBlock,
  onMoveBlock,
  onUpdateBlock,
  viewMode,
  simulateMode,
}: EmailCanvasProps) {
  const contentWidth =
    viewMode === "desktop" ? document.settings.contentWidth : 375;

  return (
    <div
      className={cn(
        "flex-1 overflow-hidden",
        simulateMode === "dark" ? "bg-zinc-900" : "bg-muted/50"
      )}
      onClick={() => onSelectBlock(null)}
    >
      <ScrollArea className="h-full">
        <div className="flex justify-center p-8">
          <div
            className={cn(
              "rounded-lg shadow-lg transition-all duration-300",
              simulateMode === "dark" ? "bg-zinc-800" : "bg-white"
            )}
            style={{ width: contentWidth, minHeight: 600 }}
            onClick={(e) => e.stopPropagation()}
          >
            {document.blocks.length === 0 ? (
              <div className="flex h-96 items-center justify-center text-muted-foreground">
                <p className="text-sm">
                  Click an element to add it to your email
                </p>
              </div>
            ) : (
              <div className="p-6">
                {document.blocks.map((block, index) => (
                  <BlockRenderer
                    key={block.id}
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    onSelect={() => onSelectBlock(block.id)}
                    onDelete={() => onDeleteBlock(block.id)}
                    onMoveUp={() => onMoveBlock(block.id, "up")}
                    onMoveDown={() => onMoveBlock(block.id, "down")}
                    canMoveUp={index > 0}
                    canMoveDown={index < document.blocks.length - 1}
                    simulateMode={simulateMode}
                    onUpdateBlock={(updates) =>
                      onUpdateBlock(block.id, updates)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
