import React from 'react';
import DragAndDrop from './DragAndDrop'

class Configuration extends React.Component {

  state = {
    files: []
  }

  handleDrop = (files) => {
    let fileList = this.state.files;
    for (var i=0; i < files.length; i++) {
      if (!files[i].name) return
      fileList.push(files[i].name)
    }
    this.setState({files: fileList})
    this.processFiles(files);  
  }

  handleFileInput = (e) => {
    this.processFiles(e.target.files);
  };

  processFiles = (fileList) => {
    
    console.log(fileList);
    let textBlob = '';
    Array.from(fileList).map(file => {
      const filesReader = new FileReader();
      filesReader.readAsText(file);


      filesReader.onload = (e) => {
        textBlob = textBlob = textBlob + e.target.result;
        textDisplayArea.textContent = textBlob;
        this.props.loadTodoState(textBlob);
      }

    });


  };

  render() {
    return (
      <div className="configuration">
        <h2>Load Data</h2>
        <p>Browse for a todo.txt file or drag-and-drop a file on the grey square.</p>
        <form>
          <input multiple type="file" name="file" onChange={this.handleFileInput}/>
        </form>
        <DragAndDrop handleDrop={this.handleDrop}>
          <div className="dropbox" style={{height: 300, width: 250}}>
            {this.state.files.map((file, i) => 
              <div key={i}>{file}</div>
            )}
          </div>
        </DragAndDrop>
        <pre id="textDisplayArea">(todo.txt will display here)</pre>
      </div>
    )
  }
}

export default Configuration;