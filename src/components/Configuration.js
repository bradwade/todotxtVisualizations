import React, {useState} from 'react';
import DragAndDrop from './DragAndDrop'

const Configuration = (props) => {

  const [files, setFiles] = useState([]);

  const handleDrop = (dropFiles) => {
    processFiles(dropFiles);
    setFiles(dropFiles);
  }

  const handleFileInput = (e) => {
    processFiles(e.target.files);
    setFiles(e.target.files);
  }

  const processFiles = (fileList) => {
    let textBlob = '';
    Array.from(fileList).forEach(file => {
      const filesReader = new FileReader();
      filesReader.readAsText(file);

      filesReader.onload = (e) => {
        textBlob = textBlob + '\n' + e.target.result;
        textDisplayArea.textContent = textBlob;
        props.setTodo(props.blobParse(textBlob));
      }
    });
  }

  return (
    <div className="configuration">
      <h2>Load Data</h2>
      <p>Browse for a todo.txt file or drag-and-drop a file on the grey square.</p>
      <form>
        <input multiple type="file" name="file" onChange={handleFileInput}/>
      </form>
      <DragAndDrop handleDrop={handleDrop}>
        <div className="dropbox" style={{height: 300, width: 250}}>

        </div>
      </DragAndDrop>
      <div>File(s) being used: {Array.from(files).map(file => file.name).join(", ")}</div>
      <pre id="textDisplayArea">(todo.txt will display here)</pre>
    </div>
  )

}

export default Configuration;
