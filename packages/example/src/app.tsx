import { useState } from 'react';
import ReactQuill from '@jswork/react-quill';
import '@jswork/react-quill/style.css';

function App() {
  const [html, setHtml] = useState('<p>Hello <strong>Quill</strong>!</p>');

  return (
    <div className="m-10 p-5">
      <h1 className="mb-5 text-3xl font-bold">React Quill Demo</h1>
      <ReactQuill defaultValue={html} onChange={setHtml} style={{ minHeight: 200, background: '#fff' }} />
      <h2 className="mb-2 mt-8 text-xl font-bold">Output HTML</h2>
      <pre className="whitespace-pre-wrap rounded bg-gray-100 p-4 text-sm">{html}</pre>
    </div>
  );
}

export default App;
