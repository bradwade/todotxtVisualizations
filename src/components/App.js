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

  const getUnique = (thing, todoObj) => {
    return todoObj
    .map(item=>item[thing])
    .filter((item)=>item)
    .reduce((acc, e) =>  acc.concat(e), [])
    .reduce((acc, e) => (acc.includes(e)) ? acc : [e, ...acc], [])
    .sort();
  }

  const updateDataFromBlob = (textBlob) => {
    setTodoBlob(textBlob);
    const todoObj = blobParse(textBlob);
    setTodo(todoObj);
    setCategoriesList({
      contexts: getUnique('contexts', todoObj),
      projects: getUnique('projects', todoObj)
    });
  }

  const wfFilter = (todoItem) => {
    return todoItem.wf == currentFilters.workflow;
  }

  const contextsFilter = (todoItem) => {
    // If there are no current contexts selected show everything.
    if (currentFilters.contexts.length === 0) return true;
    // If this item doesn't have a context don't show it.
    if (!todoItem.contexts) return false;

    // Loop through the item's contexts and see if they are in current contexts
    let found = false;
    todoItem.contexts.forEach(itemContext => {
      if (currentFilters.contexts.includes(itemContext)) {
        found = true;
      }
    });
    if (found == true) {return true;} else {return false;}
  }

  const projectsFilter = (todoItem) => {
    // If there are no current projects selected show everything.
    if (currentFilters.projects.length === 0) return true;
    // If this item doesn't have a context don't show it.
    if (!todoItem.projects) return false;

    // Loop through the item's projects and see if they are in current projects
    let found = false;
    todoItem.projects.forEach(itemContext => {
      if (currentFilters.projects.includes(itemContext)) {
        found = true;
      }
    });
    if (found == true) {return true;} else {return false;}
  }

  const filterTodo = () => {
    setFilteredTodo(
      todo
      .filter(wfFilter)
      .filter(contextsFilter)
      .filter(projectsFilter)
    )
  }

  const [todoBlob, setTodoBlob] = useState(defaultTodo);
  const [todo, setTodo] = useState(blobParse(todoBlob));
  const [workflow, setWorkflow] = useState('new');
  const [categoriesList, setCategoriesList] = useState({
    contexts: getUnique('contexts', todo),
    projects: getUnique('projects', todo)
  });
  const [currentFilters, setCurrentFilters] = useState(
    {
      contexts : [],
      projects: [],
      workflow: 'new'
    }
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filteredTodo, setFilteredTodo] = useState(todo.filter(wfFilter));

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
              currentFilters={currentFilters}
              setCurrentFilters={setCurrentFilters}
              filterTodo={filterTodo}
            />
          </Drawer>
          <div className="site-main">
            <div className="site-content">
              <Switch>
                <Route exact path="/" 
                  render={
                    (props) => 
                      <Grid {...props}
                        filteredTodo={filteredTodo}
                        todo={todo}
                        setWorkflow={setWorkflow}
                        workflow={workflow}
                        currentFilters={currentFilters}
                        setCurrentFilters={setCurrentFilters}
                        filterTodo={filterTodo}
                      /> 
                  } 
                />
                <Route path="/config" 
                  render={(props) => 
                    <Configuration {...props} 
                      todo={todo}
                      currentFilters={currentFilters}
                      categoriesList={categoriesList}
                      todoBlob={todoBlob}
                      updateDataFromBlob={updateDataFromBlob}
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
