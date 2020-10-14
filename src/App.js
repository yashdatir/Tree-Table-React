import React, { useState } from 'react';
import { data, cols, structure } from './constant';
import { Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function App() {
  const [table, setTable] = useState(data);
  const classes = useStyles();
  
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const createDataCell = (row) => {
    return (
      row.row.map((r, i) => 
        <StyledTableCell key={i}>{r.cell}</StyledTableCell>
      )
    )
  }
  const createDataRow = (rows, tab) => {
    return (
      rows.map((row, i) => 
      <React.Fragment key={i}>
      <StyledTableRow>
        <StyledTableCell><div onClick={()=>row.children.push(structure)}>{`${tab}+`}</div></StyledTableCell>
        {
          createDataCell(row)
        }
        <StyledTableCell>{`-`}</StyledTableCell>
      </StyledTableRow>
      {
        row.children.length === 0 
        ? null 
        : createDataRow(row.children, '----')
      }
      </React.Fragment>
      )
    )
  }
  return (
      <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
        <StyledTableRow>
        <StyledTableCell></StyledTableCell>
          {
            cols.map((cell, i) => 
              <StyledTableCell key={i}>{cell.cell}</StyledTableCell>
            )
          }
          <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            createDataRow(table, '*-')
          }
        </TableBody>
      </Table>
      </TableContainer>
  );
}

export default App;
