import React from 'react';
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
  Chip,
  IconButton,
  Divider,
  FormControlLabel,
  FormGroup,
  Checkbox
} from '@material-ui/core';

import {
  ChevronLeft
} from '@material-ui/icons';

const Filter = (props) => {

  const handleCategoryChange = (event) => {
    const newCatList = props.currentFilters;
    const category = event.target.dataset.category;
    const selectedItem = event.target.value;
    if (event.target.checked) {
      newCatList[category].push(selectedItem);  
    } else {
      newCatList[category] = newCatList[category].filter(item => item !== selectedItem);
    }
    props.setCurrentFilters(newCatList);
    props.filterTodo();
  }

  return (
    <Container className="filters">
      <IconButton onClick={props.handleDrawerClose}>
        <ChevronLeft /> 
      </IconButton>

      <h1>filters</h1>
      {Object.entries(props.categoriesList).map(([key, value]) => {
        return (
          <div key={key} className="filter-section">
            <h2>{key}</h2>
            <FormGroup>
              {value.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox 
                        id={key + '_' + item}
                        onChange={handleCategoryChange}
                        value={item}
                        inputProps={{'data-category':key}}
                        // checked={props.currentFilters[key].includes(item)}
                      />
                      }
                    label={item}
                  />
                )
              })}
            </FormGroup>
          </div>
        )
      })}
      <Divider />

    </Container>
  )
};

export default Filter;