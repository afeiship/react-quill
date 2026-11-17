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
