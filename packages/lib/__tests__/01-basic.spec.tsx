/**
 * 基础渲染测试
 * 验证 Anonymous 组件的基本渲染行为，包括：
 * - 默认 className 是否正确应用
 * - 自定义 className 是否能正确合并
 * - children 内容是否正常渲染
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Anonymous from '../src';

describe('Anonymous', () => {
  it('should render with default className', () => {
    render(<Anonymous>hello</Anonymous>);
    const el = screen.getByText('hello');
    expect(el).toBeInTheDocument();
    expect(el.closest('[data-component="react-component-library"]')).toBeInTheDocument();
  });

  it('should merge custom className', () => {
    const { container } = render(<Anonymous className="custom-class">test</Anonymous>);
    expect(container.firstChild).toHaveClass('react-component-library', 'custom-class');
  });

  it('should render children', () => {
    render(<Anonymous>child content</Anonymous>);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('should pass through rest props', () => {
    render(<Anonymous id="custom-id" data-role="test" />);
    expect(document.getElementById('custom-id')).toHaveAttribute('data-role', 'test');
  });

  it('should not allow overriding data-component', () => {
    const { container } = render(<Anonymous data-component="custom" />);
    expect(container.firstChild).toHaveAttribute('data-component', 'react-component-library');
  });
});
