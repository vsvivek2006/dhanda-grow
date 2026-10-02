"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { Upload, Loader2, Image as ImageIcon, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processAndUploadFile = async (file: File) => {
    // 1. Client-side size guard
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeded", {
        description: `Selected file is ${(file.size / (1024 * 1024)).toFixed(
          1
        )}MB. Maximum allowed is 5MB.`,
      });
      return;
    }

    // 2. Client-side MIME guard
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast.error("Unsupported file type", {
        description: "Please upload an image file (PNG, JPEG, WebP, GIF).",
      });
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image to storage...", {
      description: "Optimizing and storing cover asset.",
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to upload file to storage.");
      }

      onChange(data.url);
      toast.success("Cover image uploaded!", {
        id: toastId,
        description: "Image successfully attached to this post.",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to upload image. Try again.";
      toast.error("Upload failed", {
        id: toastId,
        description: message,
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    toast.info("Cover image removed", {
      description: "Don't forget to save changes to persist this update.",
    });
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#07071a] group aspect-video max-h-60 w-full flex items-center justify-center shadow-md">
          <Image
            src={value}
            alt="Cover preview"
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {/* Action Overlay */}
          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center gap-3 p-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Change Image
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled || isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative overflow-hidden ${
            isDragOver
              ? "border-purple-500 bg-purple-950/20 scale-[1.01]"
              : "border-white/10 hover:border-purple-500/70 bg-[#07071a]/50 hover:bg-[#07071a]"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center space-y-2 text-slate-300 py-3">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              <div>
                <p className="text-xs font-semibold text-white">Uploading cover image...</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Optimizing and linking asset.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
              <div className="p-2.5 rounded-xl bg-white/5 text-slate-300 border border-white/10">
                {isDragOver ? (
                  <ImageIcon className="w-5 h-5 text-yellow-400 animate-bounce" />
                ) : (
                  <Upload className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                <span className="font-semibold text-purple-400 hover:underline">
                  Click to browse
                </span>{" "}
                or drag and drop cover image
              </div>
              <p className="text-[11px] text-slate-500">
                PNG, JPG, WebP, GIF (Max 5MB)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
