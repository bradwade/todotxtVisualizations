import React, {useState, useEffect} from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Grid from './Grid';
import Filter from './Filter';
import Configuration from './Configuration';
import { defaultTodo } from '../data.js';
import { TodoTxt } from 'jstodotxt';
import { TodoTxtExtension } from 'jstodotxt/jsTodoExtensions';
import { WorkflowExtension, DueExtension2 } from '../myJsTodoExtensions';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Drawer, ClickAwayListener } from '@material-ui/core';

window.TodoTxtExtension = TodoTxtExtension;

const App = () => {

  const blobParse = (todoBlob) => {
    const todoArray = TodoTxt.parse( todoBlob, [ 
      new WorkflowExtension(),
      new DueExtension2(),
    ] );
    return workflowSync(todoArray);
  }

  const workflowSync = (todoArray) => {
    const syncedArray = todoArray.map((todoItem) => {
      if (todoItem.complete) {todoItem.wf = 'done';}
      if (todoItem.wf == 'done') {todoItem.complete = true;}
      if (todoItem.wf === undefined) {todoItem.wf = 'new'}
      return todoItem;
    });
    return syncedArray;
  }

  const getUnique = (thing) => {
    return todo
    .map(item=>item[thing])
    .filter((item)=>item)
    .reduce((acc, e) =>  acc.concat(e), [])
    .reduce((acc, e) => (acc.includes(e)) ? acc : [e, ...acc], [])
    .sort();
  }

  const [todoBlob, setTodoBlob] = useState(defaultTodo);
  const [todo, setTodo] = useState(blobParse(todoBlob));
  const [workflow, setWorkflow] = useState('new');
  const [categoriesList, setCategoriesList] = useState({
    contexts: getUnique('contexts'),
    projects: getUnique('projects')
  });
  const [currentCategories, setCurrentCategories] = useState({contexts : ['home', 'computer'], projects: ['tdtv']});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
      <div className="todo-visualizations">
        <BrowserRouter>
          <Header setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
          <Drawer anchor="left" open={drawerOpen}>
            <Filter 
              handleDrawerClose={handleDrawerClose}
              categoriesList={categoriesList}
              currentCategories={currentCategories}
              setCurrentCategories={setCurrentCategories}
            />
          </Drawer>
          <div className="site-main">
            <div className="site-content">
              <Switch>
                <Route exact path="/" 
                  render={
                    (props) => <Grid {...props} todo={todo} setWorkflow={setWorkflow} workflow={workflow} /> 
                  } 
                />
                <Route path="/config" 
                  render={(props) => 
                    <Configuration {...props} 
                      blobParse={blobParse}
                      setTodo={setTodo}
                      todo={todo}
                      currentCategories={currentCategories}
                      setCurrentCategories={setCurrentCategories}
                      categoriesList={categoriesList}
                      setCategoriesList={setCategoriesList}
                      todoBlob={todoBlob}
                      setTodoBlob={setTodoBlob}
                    /> 
                  } 
                  />

                <Route 
                  render={
                    (props) => <Grid {...props} todo={todo} /> 
                  } 
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App;
