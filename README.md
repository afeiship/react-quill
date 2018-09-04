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