import React, { useState, useEffect } from 'react';
import { data, cols, structure } from './constant';

let count = 0;

function App() {
  const [table, setTable] = useState(data);
  useEffect(()=>{
    setTable(table)
  }, [table])
  const createDataCell = (row) => {
    return (
      row.row.map((r, i) => 
        <td key={i}>{r.cell}</td>
      )
    )
  }
  const createDataRow = (rows, tab) => {
    return (
      rows.map((row, i) => 
      <React.Fragment key={i}>
      <tr>
        <td><div onClick={()=>row.children.push(structure)}>{`${tab}+`}</div></td>
        {
          createDataCell(row)
        }
        <td>{`-`}</td>
      </tr>
      {
        row.children.length === 0 
        ? null 
        : createDataRow(row.children, count++)
      }
      </React.Fragment>
      )
    )
  }
  return (
    <React.Fragment>
      <table>
        <thead>
        <tr>
        <td></td>
          {
            cols.map((cell, i) => 
              <td key={i}>{cell.cell}</td>
            )
          }
          <td></td>
          </tr>
        </thead>
        <tbody>
          {
            createDataRow(table, count++)
          }
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default App;
