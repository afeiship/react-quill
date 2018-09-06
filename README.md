# react-quill
> Quill for react

## properties:
```javascript

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onUpload: PropTypes.func,
    options: PropTypes.object,
  };

  static defaultProps = {
    onChange: noop,
    onUpload: noop,
    options: {
      theme: 'snow'
    }
  };
  
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

// install: npm install afeiship/react-quill --save
// import : import ReactQuill from 'react-quill'

class App extends React.Component{
  state = {
    value: '<p><strong><u>html!!!d</u></strong></p><p><strong><u>sdflkjsdfl</u></strong></p><p><strong><u>asdjfsf</u></strong></p>'
  };

  constructor(props){
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

  _onChange = e =>{
    // console.log(e.target.value);
    // this.setState({
    //   value: e.target.value
    // })
  };

  render(){
    return (
      <div className="hello-react-quill">
        <ReactQuill value={this.state.value} onChange={this._onChange} ref='rc' />
      </div>
    );
  }
}

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
