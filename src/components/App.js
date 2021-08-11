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

    return todoArray;
  }

  const [todo, setTodo] = useState(blobParse(defaultTodo));
  const [todoBlob, setTodoBlob] = useState(defaultTodo);
  const [workflow, setWorkflow] = useState();

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
                  (props) => <Grid {...props} todo={todo} /> 
                } 
              />
              <Route path="/grid" 
                render={
                  (props) => <Grid {...props} todo={todo} /> 
                } 
              />
              <Route path="/config" 
                render={(props) => 
                  <Configuration {...props} 
                    blobParse={blobParse}
                    setTodo={setTodo}
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
