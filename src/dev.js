import './dev.scss';
import ReactQuill from './main';

/*===example start===*/

// install: npm install afeiship/react-quill --save
// import : import ReactQuill from 'react-quill'

class App extends React.Component{
  state = {

  };

  constructor(props){
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

  render(){
    return (
      <div className="hello-react-quill">
        <ReactQuill ref='rc' />
      </div>
    );
  }
}
/*===example end===*/

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
