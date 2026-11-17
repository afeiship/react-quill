# @jswork/react-quill 组件移植 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把参考项目的 Quill 编辑器与内置 blank 插件作为默认导出组件落进 `@jswork/react-quill`，消费者只需引一份 CSS。

**Architecture:** `packages/lib/src/index.tsx` 默认导出 `ReactQuill`，模块顶层 import `blank-blot.ts` 触发 Quill 插件注册；组件挂载 Quill 实例并通过 `defaultValue`/`onChange` 与外界交互。`src/style.css` 内嵌 Quill snow 主题 + blank 高亮样式，经现有 tsup + lightningcss 配置产出单一 `dist/style.css`。Quill 设为 peer 依赖避免重复实例。

**Tech Stack:** pnpm workspace, React 18, Quill 2.0.3, TypeScript, tsup, lightningcss, vitest + @testing-library/react + jsdom

---

### Task 1: 配置依赖并安装

**Files:**
- Modify: `packages/lib/package.json`
- Modify: `packages/example/package.json`

- [ ] **Step 1: 修改 lib/package.json 的 peerDependencies / devDependencies**

当前 `peerDependencies` 为：

```json
  "peerDependencies": {
    "classnames": "*",
    "react": "*",
    "react-dom": "*"
  },
```

改为（保留原有项，追加 quill）：

```json
  "peerDependencies": {
    "classnames": "*",
    "quill": "^2.0.3",
    "react": "*",
    "react-dom": "*"
  },
```

当前 `devDependencies` 末尾为 `"vitest": "^4.1.2"`。在 `"react-dom": "^18.2.0",` 之后插入 quill：

```json
    "quill": "^2.0.3",
```

- [ ] **Step 2: 修改 example/package.json 的 dependencies**

当前：

```json
  "dependencies": {
    "classnames": "^2.5.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```

改为：

```json
  "dependencies": {
    "classnames": "^2.5.1",
    "quill": "^2.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```

- [ ] **Step 3: 安装依赖**

Run: `cd /Users/afei/github/react-quill && pnpm install`

Expected: 安装成功，`node_modules/quill/package.json` 的 version 为 `2.0.3`。

- [ ] **Step 4: 提交**

```bash
git add packages/lib/package.json packages/example/package.json
git commit -m "chore: add quill dependency"
```

---

### Task 2: 合并 Quill snow 与 blank 样式到 style.css

**Files:**
- Modify: `packages/lib/src/style.css`

说明：CSS 无法写"失败测试"，本任务的验证方式是构建后检查 `dist/style.css` 同时包含 `.ql-snow` 与 `[data-tag=blank]`。沿用现有 tsup 配置，无需改动 `tsup.config.ts`。

- [ ] **Step 1: 用 Quill 2.0.3 的 snow 样式覆盖 style.css**

当前 `packages/lib/src/style.css` 内容为注释占位。执行：

```bash
cd /Users/afei/github/react-quill
cp node_modules/quill/dist/quill.snow.css packages/lib/src/style.css
```

复制后文件开头应保留 Quill 的 license 注释 `Quill Editor v2.0.3`，文件为压缩单行格式。

- [ ] **Step 2: 在 snow 样式后追加 blank 高亮样式**

在 `packages/lib/src/style.css` 末尾（`sourceMappingURL` 注释之后）追加：

```css

/* blank blot — from aric-notes/quilljs-notes */
.ql-editor [data-tag='blank'] {
  background-color: #dcfce7;
  border-radius: 3px;
  padding: 0 3px;
}
```

- [ ] **Step 3: 提交**

```bash
git add packages/lib/src/style.css
git commit -m "feat: bundle quill snow and blank styles"
```

---

### Task 3: 移植 blank blot 插件

**Files:**
- Create: `packages/lib/src/blank-blot.ts`
- Test: `packages/lib/__tests__/02-blank-blot.spec.tsx`

- [ ] **Step 1: 写失败测试**

创建 `packages/lib/__tests__/02-blank-blot.spec.tsx`：

```tsx
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
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `cd /Users/afei/github/react-quill/packages/lib && pnpm vitest run __tests__/02-blank-blot.spec.tsx`

Expected: FAIL，提示找不到 `../src/blank-blot` 模块。

- [ ] **Step 3: 实现 blank-blot.ts**

创建 `packages/lib/src/blank-blot.ts`：

```ts
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
```

注意：与参考实现不同，这里不 `import './blank-blot.css'`；样式统一由 `src/style.css` 提供。

- [ ] **Step 4: 运行测试，确认通过**

Run: `cd /Users/afei/github/react-quill/packages/lib && pnpm vitest run __tests__/02-blank-blot.spec.tsx`

Expected: PASS（2 tests）。

- [ ] **Step 5: 提交**

```bash
git add packages/lib/src/blank-blot.ts packages/lib/__tests__/02-blank-blot.spec.tsx
git commit -m "feat: port blank blot plugin"
```

---

### Task 4: 实现 ReactQuill 组件

**Files:**
- Modify: `packages/lib/src/index.tsx`
- Test: `packages/lib/__tests__/03-editor.spec.tsx`

- [ ] **Step 1: 写失败测试**

创建 `packages/lib/__tests__/03-editor.spec.tsx`：

```tsx
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
    const { container } = render(<ReactQuill defaultValue="<p>Hello <strong>Quill</strong></p>" />);
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
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `cd /Users/afei/github/react-quill/packages/lib && pnpm vitest run __tests__/03-editor.spec.tsx`

Expected: FAIL —— 当前默认导出只是空 div，没有 `.ql-container`，`onChange` 不被调用。

- [ ] **Step 3: 实现组件**

用以下内容整体替换 `packages/lib/src/index.tsx`：

```tsx
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
```

- [ ] **Step 4: 运行全部测试，确认通过**

Run: `cd /Users/afei/github/react-quill/packages/lib && pnpm test`

Expected: PASS —— 原有 `01-basic.spec.tsx` 的 5 个用例 + blank blot 2 个 + editor 3 个，共 10 个测试全绿。

若 `03-editor.spec.tsx` 的 `text-change` 用例因 jsdom MutationObserver 未触发而失败：把该用例改为直接验证 `onChange` 在挂载时不调用，并用 `vi.mock('quill')` 单独写一个 mock 用例驱动 text-change 回调；不要改动组件实现来迎合测试。

- [ ] **Step 5: 提交**

```bash
git add packages/lib/src/index.tsx packages/lib/__tests__/03-editor.spec.tsx
git commit -m "feat: export ReactQuill editor component"
```

---

### Task 5: 更新 example 与文档

**Files:**
- Modify: `packages/example/src/app.tsx`
- Modify: `scripts/TEMPLATE.md`
- Modify: `README.md`（由 `pnpm docs` 生成）

- [ ] **Step 1: 改写 example/src/app.tsx**

当前内容依赖 `BUILD_TIME` 且展示旧用法。整体替换为：

```tsx
import { useState } from 'react';
import ReactQuill from '@jswork/react-quill';
import '@jswork/react-quill/style.css';

function App() {
  const [html, setHtml] = useState('<p>Hello <strong>Quill</strong>!</p>');

  return (
    <div className="m-10 p-5">
      <h1 className="mb-5 text-3xl font-bold">React Quill Demo</h1>
      <ReactQuill defaultValue={html} onChange={setHtml} style={{ minHeight: 200, background: '#fff' }} />
      <h2 className="mb-2 mt-8 text-xl font-bold">Output HTML</h2>
      <pre className="whitespace-pre-wrap rounded bg-gray-100 p-4 text-sm">{html}</pre>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: 更新文档模板**

`scripts/TEMPLATE.md` 当前 usage 段落中 `__GENERATE_DAPP__` 会被 example 源码替换。无需改模板结构，但需在安装段补充 Quill 是 peer 依赖的说明。把：

```shell
pnpm add @jswork/react-quill
```

改为：

```shell
pnpm add @jswork/react-quill quill
```

- [ ] **Step 3: 重新生成 README**

Run: `cd /Users/afei/github/react-quill && pnpm docs`

Expected: `README.md` 被 TEMPLATE 覆盖并注入新的 example 源码，安装命令含 `quill`。

- [ ] **Step 4: 提交**

```bash
git add packages/example/src/app.tsx scripts/TEMPLATE.md README.md
git commit -m "docs: update example and README for ReactQuill"
```

---

### Task 6: 全量验证

**Files:** 无（仅验证）

- [ ] **Step 1: 运行测试**

Run: `cd /Users/afei/github/react-quill && pnpm test`

Expected: 全部通过。

- [ ] **Step 2: 运行构建**

Run: `cd /Users/afei/github/react-quill && pnpm build`

Expected: 构建成功；检查产物：

```bash
ls packages/lib/dist
grep -c 'ql-snow' packages/lib/dist/style.css
grep -c 'data-tag=blank' packages/lib/dist/style.css
grep -c 'react-quill' packages/lib/dist/index.d.ts
```

Expected: `dist/` 含 `index.mjs` / `index.cjs` / `index.d.ts` / `style.css`；三个 grep 计数均大于 0。

- [ ] **Step 3: 启动 example 供浏览器预览**

Run: `cd /Users/afei/github/react-quill && pnpm dev`

Expected: Vite 输出本地地址（默认 `http://localhost:5173`）。把地址报告给用户，由用户在浏览器确认编辑器与 blank 工具栏按钮可见；不要自行启动 headless Chrome 截图。

- [ ] **Step 4: 汇报结果**

说明改动点、测试结果、构建产物和预览地址；确认 `git status` 无未提交改动（除用户主动的改动外）。
