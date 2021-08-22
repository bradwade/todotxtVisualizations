import React from 'react';
import WorkflowMenu from './WorkflowMenu';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Chip
} from '@material-ui/core';

import {
  AlternateEmail,
  Add,
  CalendarToday,
  Event,
  EventAvailable
} from '@material-ui/icons';

const Grid = (props) => {
  if (!props.todo) { return null; }

  // This sorts list by priority
  props.todo.sort(function(a, b) {
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
      <Container>
        <WorkflowMenu 
          setWorkflow={props.setWorkflow}
          todo={props.todo}
          workflow={props.workflow}
          setCurrentFilters={props.setCurrentFilters}
          currentFilters={props.currentFilters}
          filterTodo={props.filterTodo}
        />
      </Container>
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>P</TableCell>
                {/* <TableCell>X</TableCell>
                <TableCell>Status</TableCell> */}
                {/* <TableCell>Date</TableCell> */}
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.filteredTodo
                .map((row, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      {(row.priority ? row.priority : '')}
                    </TableCell>
                    {/* <TableCell>{row.complete ? 'X' : ''}</TableCell>
                    <TableCell>{row.wf ? row.wf : ''}</TableCell> */}
                    {/* <TableCell>
                      {row.dueString &&
                        <div className="date__due"><Event fontSize="small" />Due: {row.dueString ? row.dueString : ''}</div>
                      }
                      {row.dateString() &&
                        <div className="date__done"><EventAvailable fontSize="small" />Done: {row.dateString() ? row.dateString() : ''}</div>   
                      }
                      </TableCell> */}
                    <TableCell>
                      <div className="description"><Typography variant="body1">{row.text}</Typography></div>
                      <div className="project context">
                        {row.projects && row.projects.map((item, key) => (
                          <Chip
                            key={key}
                            size="small"
                            label={item}
                            icon={<Add />}
                            variant="outlined"
                          />
                        ))}
                        {row.contexts && row.contexts.map((item, key) => (
                          <Chip
                            key={key}
                            size="small"
                            label={item}
                            icon={<AlternateEmail />}
                            variant="outlined"
                          />
                        ))}                    
                      </div>
                      <div className="dates">
                      {row.dueString &&
                        <Chip
                          size="small"
                          label={"Due " + row.dueString}
                          icon={<Event />}
                          variant="outlined"
                        />
                      }
                      {row.dateString() &&
                        <Chip
                          size="small"
                          label={"Done " + row.dateString()}
                          icon={<EventAvailable />}
                          variant="outlined"
                        />
                      }
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Grid;
