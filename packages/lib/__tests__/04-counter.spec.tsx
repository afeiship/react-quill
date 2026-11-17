/**
 * counter module 集成测试
 * 验证字数统计模块已注册，并在工具栏中随内容更新
 */
import Quill from 'quill';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactQuill from '../src';

describe('counter module', () => {
  it('registers the counter module', () => {
    expect(Quill.import('modules/counter')).toBeDefined();
  });

  it('uses a custom maxLength', () => {
    const { container } = render(<ReactQuill maxLength={10} defaultValue="<p>hello</p>" />);
    const counter = container.querySelector('.ql-toolbar .ql-counter') as HTMLElement;
    expect(counter).toHaveTextContent('5/10');
  });

  it('disables the counter when maxLength is 0', () => {
    const { container } = render(<ReactQuill maxLength={0} defaultValue="<p>hello</p>" />);
    expect(container.querySelector('.ql-toolbar .ql-counter')).not.toBeInTheDocument();
  });

  it('shows the count in the toolbar and updates on text-change', async () => {
    const { container } = render(<ReactQuill defaultValue="<p>hello</p>" />);
    const counter = container.querySelector('.ql-toolbar .ql-counter') as HTMLElement;
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent('5/500');

    const paragraph = container.querySelector('.ql-editor p') as HTMLElement;
    paragraph.textContent = 'hello world';

    await waitFor(() => expect(counter).toHaveTextContent('11/500'));
  });
});
