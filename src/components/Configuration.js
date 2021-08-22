import React, {useState} from 'react';
import DragAndDrop from './DragAndDrop';
import { Typography, TextareaAutosize, Button, Container } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
        console.log(textBlob);
        props.updateDataFromBlob(textBlob);
      }
    });
  }

  return (
    <div className="configuration">
      <DragAndDrop handleDrop={handleDrop}>
        <Container>
          <Typography variant="h4">Load Data</Typography>
          <Typography variant="body1" component="div">
            <p>Browse for your todo.txt file (or drag-and-drop a file onto this window).</p>
            <form>
              <input multiple type="file" name="file" onChange={handleFileInput}/>
            </form>
            <Typography variant="h4">Files</Typography>
            <div>File(s) being used: {Array.from(files).map(file => file.name).join(", ")}</div>
            <Typography variant="h4">Categories</Typography>
              {Object.entries(props.categoriesList).map(([key, value]) => {
                return (
                  <div key={key} className="filter-section">
                    <Typography variant="h5">{key}</Typography>
                      {value.map((category, index) => <li key={index}>{category}</li>)}
                  </div>
                )
              })}
            <Typography variant="h4">Raw todo.txt</Typography>
            {/* <form>
            <TextareaAutosize
              aria-label="todo.txt raw text"
              placeholder="You can manually enter todo items here."
              defaultValue={props.todoBlob}
            />
              <Button
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form> */}
            <pre id="textDisplayArea">{props.todoBlob}</pre>
          </Typography>

        </Container>
      </DragAndDrop>
    </div>
  )

}

export default Configuration;
