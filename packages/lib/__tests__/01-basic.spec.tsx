/**
 * 基础渲染测试
 * 验证 ReactQuill 组件的基本渲染行为，包括：
 * - 默认 className 是否正确应用
 * - 自定义 className 是否能正确合并
 * - children 内容是否正常渲染
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactQuill from '../src';

describe('ReactQuill', () => {
  it('should render with default className', () => {
    render(<ReactQuill>hello</ReactQuill>);
    const el = screen.getByText('hello');
    expect(el).toBeInTheDocument();
    expect(el.closest('[data-component="react-quill"]')).toBeInTheDocument();
  });

  it('should merge custom className', () => {
    const { container } = render(<ReactQuill className="custom-class">test</ReactQuill>);
    expect(container.firstChild).toHaveClass('react-quill', 'custom-class');
  });

  it('should render children', () => {
    render(<ReactQuill>child content</ReactQuill>);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('should pass through rest props', () => {
    render(<ReactQuill id="custom-id" data-role="test" />);
    expect(document.getElementById('custom-id')).toHaveAttribute('data-role', 'test');
  });

  it('should not allow overriding data-component', () => {
    const { container } = render(<ReactQuill data-component="custom" />);
    expect(container.firstChild).toHaveAttribute('data-component', 'react-quill');
  });
});
