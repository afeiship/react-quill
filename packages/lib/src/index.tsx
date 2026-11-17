import cx from 'classnames';
import { useEffect, useRef, ReactNode, FC, HTMLAttributes } from 'react';
import Quill from 'quill';
import './blank-blot';

const CLASS_NAME = 'react-quill';

const TOOLBAR = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['blockquote', 'code-block'],
  ['blank', 'clean']
];

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
   * The children element.
   */
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

type ReactQuillComponent = FC<ReactQuillProps> & { version?: string };

const ReactQuill: ReactQuillComponent = ({
  defaultValue,
  value,
  onChange,
  className,
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
      modules: { toolbar: TOOLBAR }
    });
    quillRef.current = quill;

    // value 优先于 defaultValue 作为初始内容
    const initial = value !== undefined ? value : defaultValue;
    if (initial) quill.clipboard.dangerouslyPasteHTML(initial);

    quill.on('text-change', () => {
      // Quill 用 &nbsp; 保护 contenteditable 中的空格，这里还原成普通空格以便外部使用
      const html = quill.getSemanticHTML().replace(/&nbsp;/g, ' ');
      // 记录最近一次产出的 HTML，外部回传相同 value 时跳过粘贴，避免打断输入
      lastHtmlRef.current = html;
      onChangeRef.current?.(html);
    });

    return () => {
      quill.off('text-change');
      quillRef.current = null;
    };
    // 初始化时应用一次初始内容，后续更新由 value 同步 effect 处理
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 同步外部 value 变化到编辑器；首帧跳过（挂载时已应用 value）
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

export default ReactQuill;
