# Todo.txt Visualizations

This project provides various ways to visualize to do lists that are formatted using the todo.txt standard.

See: http://todotxt.org/

## Todo.txt extensions

It utilizes two todo.txt extensions:

* due:YYYY-MM-DD for a due date
* wf:workflow-state

Valid workflow states:

* new
* in-progress
* review
* done

## Quick Start

This project is using the Parcel bundler https://parceljs.org/ and jsTodoTxt library to parse the todo.txt strings.

`npm install` installs dependencies

`npm start` - runs the parcel bundler and live server

`npm run build` - creates a dist folder with static site