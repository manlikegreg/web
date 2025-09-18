'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder = 'Start typing...', className = '' }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formatText = (command: string, value?: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value || textarea.value.substring(start, end);
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);

    let newText = '';
    let newCursorPos = start;

    switch (command) {
      case 'bold':
        newText = `**${selectedText}**`;
        newCursorPos = start + 2;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        newCursorPos = start + 1;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          newText = `[${selectedText}](${url})`;
          newCursorPos = start + selectedText.length + 2;
        } else {
          return;
        }
        break;
      case 'heading':
        newText = `# ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'list':
        newText = `- ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'quote':
        newText = `> ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'code':
        newText = `\`${selectedText}\``;
        newCursorPos = start + 1;
        break;
      default:
        return;
    }

    const newValue = before + newText + after;
    onChange(newValue);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos + selectedText.length);
    }, 0);
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-2">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-1">$1</h3>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => formatText('bold')}
            className="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded transition-colors"
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => formatText('italic')}
            className="px-2 py-1 text-sm italic hover:bg-gray-200 rounded transition-colors"
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => formatText('heading')}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
            title="Heading"
          >
            H
          </button>
          <button
            type="button"
            onClick={() => formatText('link')}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
            title="Link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={() => formatText('list')}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
            title="List"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => formatText('quote')}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
            title="Quote"
          >
            "
          </button>
          <button
            type="button"
            onClick={() => formatText('code')}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
            title="Code"
          >
            {'</>'}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              !isPreview ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              isPreview ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="relative">
        {isPreview ? (
          <div
            className="p-4 min-h-[200px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 min-h-[200px] resize-none border-0 focus:ring-0 focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}