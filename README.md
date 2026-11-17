# react-component-library
> react-component-library-description

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![download][download-image]][download-url]

## installation
```shell
pnpm add @jswork/react-component-library
```

## usage
  ```js
  import Anonymous from '@jswork/react-component-library';
  import '@jswork/react-component-library/style.css';

  function App() {
    return (
      <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
        <div className="badge badge-warning absolute right-0 top-0 m-4">
          Build Time: {BUILD_TIME}
        </div>
        <Anonymous className="debug-red">
          abc
        </Anonymous>
      </div>
    );
  }

  export default App;
  ```

## preview
- https://afeiship.github.io/react-component-library/

## license
Code released under [the MIT license](https://github.com/afeiship/react-component-library/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-component-library
[version-url]: https://npmjs.org/package/@jswork/react-component-library

[license-image]: https://img.shields.io/npm/l/@jswork/react-component-library
[license-url]: https://github.com/afeiship/react-component-library/blob/master/LICENSE.txt

[download-image]: https://img.shields.io/npm/dm/@jswork/react-component-library
[download-url]: https://www.npmjs.com/package/@jswork/react-component-library
