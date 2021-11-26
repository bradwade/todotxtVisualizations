import React, {useState} from 'react';
import DragAndDrop from './DragAndDrop';
import { Divider, Typography, TextareaAutosize, Button, Container, Card, Paper, Grid, List, ListItemText } from '@material-ui/core';
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

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xs={12}>
              <Typography variant="h3">Settings</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className="settings-card">
              <Typography variant="h5">Load Data</Typography>
              <Typography variant="body2" gutterBottom={true}>
                Browse for your todo.txt file (or drag-and-drop a file onto this window).
                </Typography>
              <form className="file-upload-button">
                <input multiple type="file" name="file" onChange={handleFileInput}/>
              </form>
              
              {Array.from(files).length > 0 &&
                <>
                  <Divider className="file-upload-divider" />
                  <Typography variant="h6">Files being used:</Typography>
                </>
              }
              <List>{Array.from(files).map((file) => (
                <ListItemText>{file.name}</ListItemText>
              ))}</List>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className="settings-card">
              <Typography variant="h5">Categories</Typography>
              <Divider />
              {Object.entries(props.categoriesList).map(([key, value]) => {
                return (
                  <div key={key} className="filter-section">
                    <Typography variant="h6">{key}</Typography>
                    <List>
                      {value.map((category, index) => <ListItemText key={index}>{category}</ListItemText>)}
                    </List>
                    <Divider />
                  </div>
                )
              })}
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className="settings-card">
              <Typography variant="h5">Raw todo.txt</Typography>
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
              </Card>
            </Grid>
          </Grid>
        </Container>
      </DragAndDrop>
    </div>
  )

}

export default Configuration;
