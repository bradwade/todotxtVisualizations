import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Grid from './Grid';
import Kanban from './Kanban';
import Cleanup from './Cleanup';
import Configuration from './Configuration';
import { defaultTodo } from '../data.js';
import { TodoTxt } from 'jstodotxt';
import { TodoTxtExtension } from 'jstodotxt/jsTodoExtensions';
import { WorkflowExtension, DueExtension2 } from '../myJsTodoExtensions';

window.TodoTxtExtension = TodoTxtExtension;

class App extends React.Component {
  state = {
    todo: [],
    todoBlob: '',
    workflow: [],
  };

  loadTodoState = (todoBlob) => {

    const todoArray = TodoTxt.parse( todoBlob, [
      new WorkflowExtension(),
      new DueExtension2(),
    ] );
    this.setState({
      todo: todoArray,
      todoBlob:todoBlob
    });
  }

  componentDidMount() {
    this.loadTodoState(defaultTodo);
  }

  render() {
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
                    (props) => <Grid {...props} todo={this.state.todo} />
                  }
                />
                <Route path="/grid"
                  render={
                    (props) => <Grid {...props} todo={this.state.todo} />
                  }
                />
                <Route path="/kanban"
                  render={
                    (props) => <Kanban {...props} todo={this.state.todo} />
                  }
                />
                <Route path="/cleanup" component={Cleanup} />
                <Route path="/config"
                  render={(props) =>
                    <Configuration {...props}
                      loadTodoState={this.loadTodoState}
                    />
                  }
                 />

                <Route
                  render={
                    (props) => <Grid {...props} todo={this.state.todo} />
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
}

export default App;
