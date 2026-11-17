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
