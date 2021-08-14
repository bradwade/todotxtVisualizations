import React, {useState, useEffect} from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Grid from './Grid';
import Configuration from './Configuration';
import { defaultTodo } from '../data.js';
import { TodoTxt } from 'jstodotxt';
import { TodoTxtExtension } from 'jstodotxt/jsTodoExtensions';
import { WorkflowExtension, DueExtension2 } from '../myJsTodoExtensions';

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
  const [currentCategories, setCurrentCategories] = useState({});

  return (
    <div className="todo-visualizations">
      <Header />
      <BrowserRouter>
        <div className="site-main">
          <Navigation />
          <div className="site-content">
            <Switch>
              <Route exact path="/" 
                render={
                  (props) => <Grid {...props} todo={todo} setWorkflow={setWorkflow} workflow={workflow} /> 
                } 
              />
              <Route path="/grid" 
                render={
                  (props) => <Grid {...props} todo={todo} setWorkflow={setWorkflow} workflow={workflow}/> 
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
  )
}

export default App;
