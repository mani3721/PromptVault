'use client';

import { useState, useRef, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { ALL_TAGS } from '@/lib/types';
import { addPrompt, uploadPromptImage } from '@/queries/prompts';
import { Prompt } from '@/lib/types';

const SELECTABLE_TAGS = ALL_TAGS.filter((t) => t !== 'All');

interface AddPromptModalProps {
  user: User;
  onClose: () => void;
  onSuccess: (prompt: Prompt) => void;
}

export function AddPromptModal({ user, onClose, onSuccess }: AddPromptModalProps) {
  const [title, setTitle] = useState('');
  const [fullPrompt, setFullPrompt] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleImageFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setSubmitError('Only image files are allowed (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setSubmitError(`Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 10 MB.`);
      return;
    }
    setSubmitError('');
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleImageFile(file);
    },
    [handleImageFile]
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !fullPrompt.trim()) return;
    if (selectedTags.length === 0) {
      setSubmitError('Please select at least one tag.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Auto-generate description from first 150 chars of fullPrompt
      const autoDescription =
        fullPrompt.trim().slice(0, 150).replace(/\n/g, ' ') +
        (fullPrompt.trim().length > 150 ? '…' : '');

      // Upload image or use a picsum placeholder
      let imageUrl = `https://picsum.photos/seed/${Date.now()}/640/360`;
      if (imageFile) {
        const uploaded = await uploadPromptImage(imageFile);
        if (!uploaded) {
          setSubmitError('Image upload failed. Please try again.');
          setIsSubmitting(false);
          return;
        }
        imageUrl = uploaded;
      }

      const authorName =
        user.user_metadata?.full_name ||
        user.email?.split('@')[0] ||
        'Anonymous';
      const authorAvatar = (user.user_metadata?.avatar_url as string) || '';

      const created = await addPrompt({
        title: title.trim(),
        description: autoDescription,
        fullPrompt: fullPrompt.trim(),
        imageUrl,
        tags: selectedTags,
        authorId: user.id,
        authorName,
        authorAvatar,
      });

      if (!created) {
        setSubmitError('Failed to save prompt. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        onSuccess(created);
        onClose();
      }, 1200);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const isValid =
    title.trim().length > 0 &&
    fullPrompt.trim().length > 0 &&
    selectedTags.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">

        {/* Header */}
        <div className="flex flex-none items-center justify-between border-b border-neutral-100 px-6 py-4 dark:border-neutral-800">
          <div>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Add a Prompt
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Share your best AI prompt with the community
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-all hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-5 p-6">

            {/* Image upload */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Cover Image <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <div
                className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all ${
                  isDragging
                    ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/30'
                    : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-neutral-600'
                }`}
                style={{ aspectRatio: '16/9' }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                      <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700">
                        Change image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-6 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-700">
                      <svg className="h-5 w-5 text-neutral-500 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        Drop an image or click to upload
                      </p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">
                        PNG, JPG, WEBP · max 10 MB · auto-generated if skipped
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }}
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Ultimate Code Review Assistant"
                maxLength={80}
                className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:border-indigo-500"
              />
              <p className="mt-1 text-right text-[11px] text-neutral-400">{title.length}/80</p>
            </div>

            {/* Full prompt */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Full Prompt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={fullPrompt}
                onChange={(e) => setFullPrompt(e.target.value)}
                placeholder="Paste your complete prompt here. Include all instructions, context, and placeholders like [YOUR TOPIC]..."
                rows={10}
                className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 font-mono text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:border-indigo-500"
              />
              <p className="mt-1 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="text-neutral-400/70">Preview card description auto-generated from this</span>
                <span>{fullPrompt.length} chars</span>
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Tags <span className="text-red-500">*</span>{' '}
                <span className="font-normal text-neutral-400">(pick 1–3)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {SELECTABLE_TAGS.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        active
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                          : 'border border-neutral-200 bg-white text-neutral-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400'
                      }`}
                    >
                      {active && (
                        <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {submitError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-400">
                {submitError}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-none border-t border-neutral-100 px-6 py-4 dark:border-neutral-800">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Posting as{' '}
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-9 rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`flex h-9 items-center gap-2 rounded-lg px-5 text-sm font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                    submitSuccess
                      ? 'bg-emerald-500'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-500/30'
                  }`}
                >
                  {submitSuccess ? (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Published!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    'Publish Prompt'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
