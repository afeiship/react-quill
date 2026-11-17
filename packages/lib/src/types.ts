import type { FC, HTMLAttributes, ReactNode } from 'react';
import type { ToolbarConfig } from 'quill/modules/toolbar.js';

export type ReactQuillProps = {
  /**
   * Initial HTML content. Applied once on mount.
   */
  defaultValue?: string;
  /**
   * Controlled HTML content. When it differs from the editor's current
   * content, the editor content is replaced.
   */
  value?: string;
  /**
   * Called with semantic HTML whenever the editor content changes.
   */
  onChange?: (html: string) => void;
  /**
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * Toolbar controls config passed to Quill's toolbar module.
   * @default [['bold', 'italic', 'underline', 'strike'], [{ color: [] }, { background: [] }]]
   */
  toolbar?: ToolbarConfig;
  /**
   * Maximum character count shown in the toolbar counter.
   * Set to 0 to disable the counter.
   * @default 500
   */
  maxLength?: number;
  /**
   * The children element.
   */
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export type ReactQuillComponent = FC<ReactQuillProps> & { version?: string };
