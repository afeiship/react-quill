import cx from 'classnames';
import { useEffect, useRef } from 'react';
import Quill from 'quill';
import { DEFAULT_MAX_LENGTH } from './plugins/counter';
import type { ReactQuillComponent, ReactQuillProps } from './types';
import { toHexColor } from './utils';
import './style.css';
import './plugins';

const CLASS_NAME = 'react-quill';

const TOOLBAR = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

const ReactQuill: ReactQuillComponent = ({
  defaultValue,
  value,
  onChange,
  className,
  toolbar,
  maxLength = DEFAULT_MAX_LENGTH,
  placeholder,
  children,
  ...rest
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const lastHtmlRef = useRef('');
  const mountedRef = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const quill = new Quill(editorRef.current!, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: toolbar ?? TOOLBAR,
        counter: maxLength > 0 ? { maxLength } : false,
      },
    });
    quillRef.current = quill;

    // value takes precedence over defaultValue as initial content
    const initial = value !== undefined ? value : defaultValue;
    if (initial) quill.clipboard.dangerouslyPasteHTML(initial);

    quill.on('text-change', () => {
      // Quill guards spaces with &nbsp; in contenteditable; restore plain
      // spaces for external use
      const html = toHexColor(quill.getSemanticHTML().replace(/&nbsp;/g, ' '));
      // Track the last emitted html so re-feeding the same value skips the
      // paste and avoids interrupting typing
      lastHtmlRef.current = html;
      onChangeRef.current?.(html);
    });

    return () => {
      quill.off('text-change');
      quillRef.current = null;
    };
    // Apply initial content once on mount; later updates go through the
    // value sync effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes into the editor; skip the first frame
  // (value is applied on mount)
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (value === undefined || value === lastHtmlRef.current) return;
    quillRef.current?.clipboard.dangerouslyPasteHTML(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div {...rest} data-component={CLASS_NAME} className={cx(CLASS_NAME, className)}>
      <div ref={editorRef} />
      {children}
    </div>
  );
};

ReactQuill.displayName = CLASS_NAME;
ReactQuill.version = __VERSION__;

export type { ReactQuillProps };
export default ReactQuill;
