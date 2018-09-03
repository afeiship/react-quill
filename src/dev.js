import './dev.scss';
import ReactQuill from './main';

/*===example start===*/

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
/*===example end===*/

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
