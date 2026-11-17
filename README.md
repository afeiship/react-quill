# react-quill
> React quill.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![download][download-image]][download-url]

## installation
```shell
pnpm add @jswork/react-quill quill
```

## usage
  ```js
  import { useState } from 'react';
  import ReactQuill from '@jswork/react-quill';
  import '@jswork/react-quill/style.css';

  function App() {
    const [html, setHtml] = useState('<p>Hello <strong>Quill</strong>!</p>');

    return (
      <div className="m-10 p-5">
        <h1 className="mb-5 text-3xl font-bold">React Quill Demo</h1>
        <ReactQuill value={html} onChange={setHtml} style={{ minHeight: 200, background: '#fff' }} />
        <h2 className="mb-2 mt-8 text-xl font-bold">Output HTML</h2>
        <pre className="whitespace-pre-wrap rounded bg-gray-100 p-4 text-sm">{html}</pre>
      </div>
    );
  }

  export default App;
  ```

## license
Code released under [the MIT license](https://github.com/afeiship/react-quill/blob/main/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-quill
[version-url]: https://npmjs.org/package/@jswork/react-quill

[license-image]: https://img.shields.io/npm/l/@jswork/react-quill
[license-url]: https://github.com/afeiship/react-quill/blob/main/LICENSE.txt

[download-image]: https://img.shields.io/npm/dm/@jswork/react-quill
[download-url]: https://www.npmjs.com/package/@jswork/react-quill
