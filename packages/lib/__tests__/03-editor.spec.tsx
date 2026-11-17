/**
 * ReactQuill 编辑器行为测试
 * 验证 Quill 挂载、工具栏、defaultValue 应用与 onChange 输出
 */
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactQuill from '../src';

describe('ReactQuill editor', () => {
  it('mounts a Quill snow editor with the blank toolbar button', () => {
    const { container } = render(<ReactQuill />);
    expect(container.querySelector('.ql-container.ql-snow')).toBeInTheDocument();
    expect(container.querySelector('.ql-editor')).toBeInTheDocument();
    expect(container.querySelector('.ql-toolbar button.ql-blank')).toBeInTheDocument();
    expect(container.querySelector('.ql-toolbar button.ql-clean')).toBeInTheDocument();
  });

  it('applies defaultValue html on mount', () => {
    const { container } = render(
      <ReactQuill defaultValue="<p>Hello <strong>Quill</strong></p>" />
    );
    const editor = container.querySelector('.ql-editor') as HTMLElement;
    expect(editor.textContent).toBe('Hello Quill');
    expect(editor.querySelector('strong')).toHaveTextContent('Quill');
  });

  it('calls onChange with normalized html on text-change', async () => {
    const onChange = vi.fn();
    const { container } = render(<ReactQuill defaultValue="<p>before</p>" onChange={onChange} />);
    onChange.mockClear();

    const editor = container.querySelector('.ql-editor') as HTMLElement;
    const paragraph = editor.querySelector('p') as HTMLElement;
    paragraph.textContent = 'after';

    await waitFor(() => expect(onChange).toHaveBeenCalled());
    const html = onChange.mock.lastCall?.[0] as string;
    expect(html).toContain('after');
    expect(html).not.toContain('&nbsp;');
  });
});

describe('ReactQuill value prop', () => {
  it('uses value as initial content on mount', () => {
    const { container } = render(<ReactQuill value="<p>controlled content</p>" />);
    const editor = container.querySelector('.ql-editor') as HTMLElement;
    expect(editor.textContent).toBe('controlled content');
  });

  it('prefers value over defaultValue when both are provided', () => {
    const { container } = render(<ReactQuill value="<p>val</p>" defaultValue="<p>def</p>" />);
    const editor = container.querySelector('.ql-editor') as HTMLElement;
    expect(editor.textContent).toBe('val');
  });

  it('updates editor content when value changes externally', async () => {
    const { rerender, container } = render(<ReactQuill value="<p>first</p>" />);
    rerender(<ReactQuill value="<p>second</p>" />);
    const editor = container.querySelector('.ql-editor') as HTMLElement;
    await waitFor(() => expect(editor.textContent).toBe('second'));
  });

  it('does not emit onChange when value stays the same', async () => {
    const onChange = vi.fn();
    const { rerender } = render(<ReactQuill value="<p>same</p>" onChange={onChange} />);
    onChange.mockClear();
    rerender(<ReactQuill value="<p>same</p>" onChange={onChange} />);
    await new Promise((r) => setTimeout(r, 50));
    expect(onChange).not.toHaveBeenCalled();
  });
});
