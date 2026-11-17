import Quill from 'quill';
import Inline from 'quill/blots/inline.js';

// 内联 blot：输出 <span data-tag="blank">文本</span>
// 必须继承 Quill 的 Inline（而非 Parchment.InlineBlot），否则 format 不会进入 Delta
class BlankBlot extends Inline {
  static blotName = 'blank';
  static tagName = 'span';

  static create() {
    const node = super.create() as HTMLElement;
    node.setAttribute('data-tag', 'blank');
    return node;
  }

  static formats(node: HTMLElement) {
    return node.getAttribute('data-tag') === 'blank' ? true : undefined;
  }
}

const icons = Quill.import('ui/icons') as Record<string, string>;
icons.blank =
  '<svg viewBox="0 0 18 18"><rect x="3" y="4" width="12" height="10" fill="none" class="ql-stroke" stroke-dasharray="2 2"/></svg>';

Quill.register(BlankBlot);
