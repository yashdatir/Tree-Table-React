import React, { useState, useEffect } from 'react';
import { data, cols, INITIAL_VALUE, object } from './constant';
import { Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

let heirarchy = [0]

function App() {
  const [table, setTable] = useState(data);
  const classes = useStyles();
  let temp = table
  // useEffect(() => {
  //   setTable(temp)
  // }, [])
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

  const addRow = (pid, i) => {
    console.log(heirarchy, pid, i)
    if(pid === INITIAL_VALUE){
      temp.push(object)
    }
    setTable(temp, () => console.log(table))
  }

  const createDataCell = (row) => {
    return (
      row.row.map((r, i) => 
      <React.Fragment key={i}>
        <StyledTableCell>{r.cell}</StyledTableCell>
      </React.Fragment>
      )
    )
  }
  const createDataRow = (rows, pid) => {
    console.log(rows, heirarchy[heirarchy.length - 1], pid)
    pid >= heirarchy[heirarchy.length-1]
    ? heirarchy.push(heirarchy[heirarchy.length - 1] + 1) : console.log()
    return (
      rows.map((row, i) => 
      <React.Fragment key={i}>
      <StyledTableRow>
        <StyledTableCell>
          <button onClick={()=>addRow(pid, i)}>Add</button>
          {`pid: ${pid}, i:${i}`}
        </StyledTableCell>
        {
          createDataCell(row)
        }
      </StyledTableRow>
      {
        row.children.length === 0 
        ? null 
        : createDataRow(row.children, i)
      }
      </React.Fragment>
      )
    )
  }
  console.log(table)
  return (
    <React.Fragment>
      <Button onClick={()=>addRow(INITIAL_VALUE, 0)}>Add</Button>
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
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            createDataRow(table, INITIAL_VALUE)
          }
        </TableBody>
      </Table>
      </TableContainer>
      </React.Fragment>
  );
}

export default App;
