import React from 'react';

class Grid extends React.Component {
  render () {
    if (!this.props.todo) { return null; }

    // This sorts list by priority
    this.props.todo.sort(function(a, b) {
      if (a.priority == null && b.priority == null) return 0;
      if (a.priority == null || a.priority > b.priority) {
        return 1;
      }
      if (b.priority == null || a.priority < b.priority) {
        return -1;
      }
      return 0;
    });

    return (
      <div className="grid-view">
        <p>Maybe we should include the groupings in this view...</p>
        <table id="todoTable">
          <thead>
            <tr>
              <th>P</th>
              <th>X</th>
              <th>Status</th>
              <th>Due</th>
              <th>Date</th>
              <th>Description</th>
              <th>Project</th>
              <th>Context</th>
            </tr>
          </thead>
          <tbody className="table-body">
          {this.props.todo.map((row, key) => (
            <tr key={key} className={(key % 2 === 0) ? 'odd' : 'even'}>
              <td className="priority">{(row.priority ? row.priority : '')}</td>
              <td className="complete">{row.complete ? 'X' : ''}</td>
              <td className="workflow">{row.wf ? row.wf : ''}</td>
              <td className="due-date">{row.dueString ? row.dueString : ''}</td>
              <td className="date">{row.dateString() ? row.dateString() : ''}</td>
              <td className="description">{row.text}</td>
              <td className="project">{row.projects ? row.projects : ''}</td>
              <td className="context">{row.contexts ? row.contexts : ''}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Grid;
