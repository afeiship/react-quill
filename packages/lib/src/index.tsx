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
} & HTMLAttributes<HTMLDivElement>;

type ReactQuillComponent = FC<ReactQuillProps> & { version?: string };

const ReactQuill: ReactQuillComponent = ({
  defaultValue,
  onChange,
  className,
  children,
  ...rest
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const quill = new Quill(editorRef.current!, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR }
    });

    if (defaultValue) quill.clipboard.dangerouslyPasteHTML(defaultValue);

    quill.on('text-change', () => {
      // Quill 用 &nbsp; 保护 contenteditable 中的空格，这里还原成普通空格以便外部使用
      const html = quill.getSemanticHTML().replace(/&nbsp;/g, ' ');
      onChangeRef.current?.(html);
    });

    return () => {
      quill.off('text-change');
    };
    // 初始化时应用一次 defaultValue，后续更新不应重置编辑器内容
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
