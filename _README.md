# react-quill
> Quill for react

## properties:
```javascript
BACKUP_PROPERTIES
```

## install && import:
```bash
npm install --save afeiship/react-quill --registry=https://registry.npm.taobao.org
```

```js
import ReactQuill from 'react-quill';
```

```scss
// customize your styles:
$react-quill-options:(
);

@import 'node_modules/react-quill/dist/style.scss';
```


## usage:
```jsx
BACKUP_USAGE
```
## resources:
+ https://quilljs.com/docs/configuration/

## bug for button:
1. button的type 属性，IE的默认是 “button”，非IE默认是 “submit”。
2. 如果想不提交需要指定type为”button”。

```html
<form>
    <button type="button">button</button><!--不提交form-->
    <button type="submit">button</button><!--提交form-->
    <button>button</button><!--非IE提交form，IE不提交form-->
</form>
```
