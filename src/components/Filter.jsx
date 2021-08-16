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
              {value.map((category, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox 
                        checked={props.currentCategories[key].includes(category)} 
//                        onChange={handleChange} 
                        name="checkedA" />
                      }
                    label={category}
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