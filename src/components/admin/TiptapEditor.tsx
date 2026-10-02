"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
} from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const lastEmittedHtml = useRef<string>(content || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-purple-400 font-semibold underline decoration-purple-500/70 underline-offset-4 hover:text-yellow-400 hover:decoration-yellow-400 transition-colors cursor-pointer",
        },
      }),
      ImageExtension.configure({
        inline: true,
        HTMLAttributes: {
          class: "rounded-xl border border-white/10 shadow-lg my-4 max-w-full h-auto mx-auto block",
          loading: "lazy",
        },
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "tiptap-editor-surface focus:outline-none min-h-[380px] p-5 text-slate-100 selection:bg-purple-600/30 selection:text-white font-sans",
      },
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      lastEmittedHtml.current = html;
      onChange(html);
    },
  });

  // Sync external content if updated (e.g. from AI generation or reset)
  useEffect(() => {
    if (editor && content !== lastEmittedHtml.current) {
      lastEmittedHtml.current = content || "";
      editor.commands.setContent(content || "", { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#07071a] min-h-[350px] flex items-center justify-center text-slate-400 text-sm">
        Loading editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Upload failed");
      }

      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      alert(msg);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const addImage = () => {
    const directUrl = window.prompt("Enter Image URL (or cancel to upload from disk):");
    if (directUrl && directUrl.trim()) {
      editor.chain().focus().setImage({ src: directUrl.trim() }).run();
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#08081a] overflow-hidden focus-within:border-purple-500/70 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all shadow-xl">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleInlineImageUpload}
        className="hidden"
      />
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2.5 bg-[#0d0d26] border-b border-white/10">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("bold")
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("italic")
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("strike")
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("heading", { level: 2 })
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("heading", { level: 3 })
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("bulletList")
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("orderedList")
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("blockquote")
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          title="Divider"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            editor.isActive("link")
              ? "bg-purple-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          title="Add Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
