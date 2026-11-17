/**
 * blank blot 注册测试
 * 验证模块加载后 Quill 中已注册 blank blot 与工具栏图标
 */
import Quill from 'quill';
import '../src/blank-blot';

describe('blank blot', () => {
  it('registers the blank format', () => {
    const BlankBlot = Quill.import('formats/blank') as {
      blotName: string;
      tagName: string;
      create: () => HTMLElement;
      formats: (node: HTMLElement) => boolean | undefined;
    };
    expect(BlankBlot.blotName).toBe('blank');
    expect(BlankBlot.tagName.toUpperCase()).toBe('SPAN');

    const node = BlankBlot.create();
    expect(node.getAttribute('data-tag')).toBe('blank');
    expect(BlankBlot.formats(node)).toBe(true);

    const plain = document.createElement('span');
    expect(BlankBlot.formats(plain)).toBeUndefined();
  });

  it('registers the blank toolbar icon', () => {
    const icons = Quill.import('ui/icons') as Record<string, string>;
    expect(icons.blank).toContain('<svg');
    expect(icons.blank).toContain('stroke-dasharray="2 2"');
  });
});
