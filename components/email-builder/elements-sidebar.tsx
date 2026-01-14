"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Heading1,
  Type,
  ImageIcon,
  Square,
  LayoutGrid,
  Columns,
  Minus,
  Space,
  Share2,
  FileText,
  Grid3X3,
} from "lucide-react";
import type { BlockType } from "@/types/email-builder";

interface ElementsSidebarProps {
  onAddBlock: (type: BlockType) => void;
}

const elements: { type: BlockType; label: string; icon: React.ReactNode }[] = [
  { type: "heading", label: "Heading", icon: <Heading1 className="h-5 w-5" /> },
  { type: "text", label: "Text", icon: <Type className="h-5 w-5" /> },
  { type: "image", label: "Image", icon: <ImageIcon className="h-5 w-5" /> },
  { type: "button", label: "Button", icon: <Square className="h-5 w-5" /> },
  { type: "header", label: "Header", icon: <LayoutGrid className="h-5 w-5" /> },
  { type: "columns", label: "Columns", icon: <Columns className="h-5 w-5" /> },
  { type: "divider", label: "Divider", icon: <Minus className="h-5 w-5" /> },
  { type: "spacer", label: "Spacer", icon: <Space className="h-5 w-5" /> },
  {
    type: "social-links",
    label: "Social Links",
    icon: <Share2 className="h-5 w-5" />,
  },
  { type: "footer", label: "Footer", icon: <FileText className="h-5 w-5" /> },
];

export function ElementsSidebar({ onAddBlock }: ElementsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredElements = elements.filter((el) =>
    el.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="flex w-60 flex-col border-r border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border p-3">
        <Grid3X3 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Elements</span>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search elements"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>
      </div>

      <Tabs defaultValue="elements" className="flex-1">
        <div className="px-3">
          <TabsList className="w-full">
            <TabsTrigger value="elements" className="flex-1 text-xs">
              Elements
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex-1 text-xs" disabled>
              Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="elements" className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid grid-cols-2 gap-2 p-3">
              {filteredElements.map((element) => (
                <button
                  key={element.type}
                  onClick={() => onAddBlock(element.type)}
                  className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-background p-4 text-muted-foreground transition-colors hover:border-primary hover:bg-muted hover:text-foreground"
                >
                  {element.icon}
                  <span className="text-xs">{element.label}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
