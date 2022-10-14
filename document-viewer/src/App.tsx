import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css';

interface DocumentListProps {
  records: Record<string, string>[]
}

const DocumentList: React.FC<DocumentListProps> = ({records}) => {
  const [pdfUrl, setPdfUrl] = useState<string>("/assets/9PACK.pdf");
  const onDocumentButtonClick = (url: string) => setPdfUrl(url);

  return (
    records.length === 0 ? <></> : (
      <section className="DocumentList">
        <div className="DocumentTableContainer">
          <table >
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Content</th>
                <th>Tecnician</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record['url']}>
                  <td><button type='button' onClick={() => onDocumentButtonClick('http://localhost:8080'+record['url'])}>{record["Agreement number"]}</button></td>
                  <td><a href={'http://localhost:8080'+record['url'].replace("document", "meta")} target="black">Metadata</a></td>
                  <td>{record["Technician first and last name"]}</td>
                </tr>
              ))}  
            </tbody>
        </table>
        </div>
        <div className="DocumentViewer">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl}/>
          </Worker>
        </div>
      </section>
    )
  )
}

function App() {
  const [records, setRecords] = useState< Record<string, string>[]>([]);

  useEffect(() => {
    (async () => {
        const response = await axios.get<Record<string, string>[]>("http://localhost:8080/documents");      
        setRecords(response.data);
    })()
  }, [])

  return (
    <main className="App">
      <header className="App-header"><h2>Document Viewer</h2></header>
      <DocumentList records={records} />
    </main>
  );
}

export default App;
