# @jswork/react-quill 组件移植设计

日期：2026-11-17

## 背景

参考项目 `aric-notes/quilljs-notes/src/components` 有三个文件：

- `blank-blot.ts`：注册 Quill 内联 blot `blank`，输出 `<span data-tag="blank">…</span>`，并注册虚线框工具栏图标
- `blank-blot.css`：`[data-tag='blank']` 的绿底高亮样式
- `quill-editor.tsx`：挂载 Quill（snow 主题 + 固定工具栏）、应用 `defaultValue`、在 `text-change` 时把语义 HTML 通过 `onChange` 回调抛出

本项目 `packages/lib` 是 `@jswork/react-quill` 库的脚手架（pnpm workspace + tsup + lightningcss）。目标是把上述功能作为默认导出组件落进库里，并让消费者只引一份 CSS。

## 目标 / 非目标

目标：

1. 默认导出 `ReactQuill` React 组件，API 为 `defaultValue` / `onChange`
2. 内置 `blank` 插件，自动注册，无需消费者手动 import
3. 单一 CSS 入口：`import '@jswork/react-quill/style.css'` 同时包含 Quill snow 主题与 blank 样式

非目标：

- 可配置工具栏、`value` 受控同步、其他插件、SSR 特殊处理

## 设计

### 文件结构

| 文件 | 内容 |
| --- | --- |
| `packages/lib/src/index.tsx` | 默认导出 `ReactQuill`；模块顶层 `import './blank-blot'` 触发插件注册 |
| `packages/lib/src/blank-blot.ts` | 从参考项目移植 blot 定义与图标注册；不 import CSS |
| `packages/lib/src/style.css` | 注明来源版本后，粘贴 `quill/dist/quill.snow.css` 全文，再追加 blank 高亮样式 |
| `packages/lib/__tests__/01-basic.spec.tsx` | 保留原 wrapper 用例，补充编辑器行为测试 |
| `packages/lib/package.json` | 添加 `quill` 到 peerDependencies 与 devDependencies（`^2.0.3`） |
| `packages/example/src/app.tsx` | 改为 `defaultValue` / `onChange` 受控演示 |
| `packages/example/package.json` | 添加 `quill` 依赖 |
| 根 `package.json` / `README.md` | 修正 build/test 过滤器的旧包名，同步 usage 文档 |

### 组件 API

```ts
type ReactQuillProps = {
  defaultValue?: string;
  onChange?: (html: string) => void;
  className?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
```

- 外层 `div` 保留 `data-component="react-quill"`、`className`、`children`、其余 HTMLAttributes 透传（兼容现有测试）
- 内层 `div` 作为 Quill 挂载点
- `useEffect` 只挂载一次；`onChange` 存入 ref 保持最新引用
- `text-change` 时调用 `quill.getSemanticHTML().replace(/&nbsp;/g, ' ')` 抛出
- 卸载时 `quill.off('text-change')`

### blank 插件

原样移植参考实现：继承 `quill/blots/inline.js`，`blotName = 'blank'`，`tagName = 'span'`，`create` 设置 `data-tag="blank"`，`formats` 识别该属性；注册虚线框 SVG 到 `ui/icons` 的 `blank` 键；`Quill.register(BlankBlot)`。

### 工具栏

固定使用参考项目配置：

```ts
[
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['blockquote', 'code-block'],
  ['blank', 'clean']
]
```

### 样式打包

沿用现有 tsup + `@jswork/tsup-plugin-lightningcss` 配置，`src/style.css` 编译为 `dist/style.css`。把 Quill snow 样式复制进 style.css 而不是运行时 import `quill/dist/quill.snow.css`，避免打包器对 quill CSS 的处理差异；在文件头注明来源 quill 版本。

### 依赖策略

`quill` 设为 peerDependency（避免打进 bundle 造成 Quill 实例重复、插件注册失效）+ devDependency（供构建与测试）。example 作为 workspace 内的实际运行方也添加 quill 依赖。

### 测试

保留原有 5 个 wrapper 用例；新增：挂载后出现 `.ql-container` / `.ql-editor`、工具栏含 `ql-blank`、`defaultValue` 中的 HTML 生效、`text-change` 触发 `onChange` 且还原 `&nbsp;`。若 jsdom 缺少 Range/Selection API，用最小 setup polyfill。

## 验证

- `pnpm install` 后 `pnpm test` 全绿
- `pnpm build` 产出 `dist/index.mjs` / `dist/index.cjs` / `dist/index.d.ts` / `dist/style.css`，style.css 同时含 `.ql-snow` 与 `[data-tag='blank']`
- `pnpm dev` 起 example，浏览器可见 Quill 编辑器与 blank 工具栏按钮
