"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Monitor,
  Smartphone,
  Sun,
  Moon,
  Undo2,
  Redo2,
  Eye,
  Download,
  ChevronDown,
  Code,
} from "lucide-react";
import type { EmailDocument } from "@/types/email-builder";
import {
  renderEmailToHtml,
  generateEmailTemplateCode,
} from "@/lib/email-renderer";

interface EmailBuilderHeaderProps {
  documentName: string;
  onNameChange: (name: string) => void;
  viewMode: "desktop" | "mobile";
  onViewModeChange: (mode: "desktop" | "mobile") => void;
  simulateMode: "light" | "dark";
  onSimulateModeChange: (mode: "light" | "dark") => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  document: EmailDocument;
}

export function EmailBuilderHeader({
  documentName,
  onNameChange,
  viewMode,
  onViewModeChange,
  simulateMode,
  onSimulateModeChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  document,
}: EmailBuilderHeaderProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");

  const handlePreview = async () => {
    const html = await renderEmailToHtml(document);
    setPreviewHtml(html);
    setIsPreviewOpen(true);
  };

  const handleExportHtml = async () => {
    const html = await renderEmailToHtml(document);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${documentName.replace(/\s+/g, "-").toLowerCase()}.html`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportTemplate = () => {
    const code = generateEmailTemplateCode(document);
    const blob = new Blob([code], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${documentName.replace(/\s+/g, "-").toLowerCase()}.tsx`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold">
            EB
          </div>
          <Input
            value={documentName}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-8 w-40 border-none bg-transparent px-2 text-sm font-medium focus-visible:ring-1"
          />
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onUndo}
              disabled={!canUndo}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onRedo}
              disabled={!canRedo}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-muted p-1">
            <Button
              variant={viewMode === "desktop" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 gap-1.5 px-3"
              onClick={() => onViewModeChange("desktop")}
            >
              <Monitor className="h-4 w-4" />
              Desktop
            </Button>
            <Button
              variant={viewMode === "mobile" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 gap-1.5 px-3"
              onClick={() => onViewModeChange("mobile")}
            >
              <Smartphone className="h-4 w-4" />
              Mobile
            </Button>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Simulate:</span>
            <Button
              variant={simulateMode === "light" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 gap-1.5 px-2"
              onClick={() => onSimulateModeChange("light")}
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>
            <Button
              variant={simulateMode === "dark" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 gap-1.5 px-2"
              onClick={() => onSimulateModeChange("dark")}
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 bg-transparent"
            onClick={handlePreview}
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 bg-transparent"
              >
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportHtml}>
                <Download className="h-4 w-4 mr-2" />
                Export as HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportTemplate}>
                <Code className="h-4 w-4 mr-2" />
                Export as React Email Template
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto rounded-lg border border-border bg-white">
            <iframe
              srcDoc={previewHtml}
              className="h-full w-full min-h-[60vh]"
              title="Email Preview"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
