# react-quill
> React quill.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![download][download-image]][download-url]

## installation
```shell
pnpm add @jswork/react-quill
```

## usage
  ```js
  import ReactQuill from '@jswork/react-quill';
  import '@jswork/react-quill/style.css';

  function App() {
    return (
      <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
        <div className="badge badge-warning absolute right-0 top-0 m-4">
          Build Time: {BUILD_TIME}
        </div>
        <ReactQuill className="debug-red">
          abc
        </ReactQuill>
      </div>
    );
  }

  export default App;
  ```

## preview
- https://afeiship.github.io/react-quill/

## license
Code released under [the MIT license](https://github.com/afeiship/react-quill/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-quill
[version-url]: https://npmjs.org/package/@jswork/react-quill

[license-image]: https://img.shields.io/npm/l/@jswork/react-quill
[license-url]: https://github.com/afeiship/react-quill/blob/master/LICENSE.txt

[download-image]: https://img.shields.io/npm/dm/@jswork/react-quill
[download-url]: https://www.npmjs.com/package/@jswork/react-quill
