import { useEffect, useState } from "react";
import "./globals.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, symbol, price) {
  return { name, symbol, price };
}


export default function WatchList({ data, index }) {
  useEffect(()=>{
    console.log(data);

  })
  const [watchList, setWatchList] = useState();
  useEffect(() => {
    if (data) {
      const arr = data.map((stock) => {
        console.log(data);
        console.log(stock);
        return (
          createData(stock.name, stock.symbol, stock.price)
          // <div key={`${stock.symbol} ${index} container`} className="watch-stock">
          //   <div key={`${stock.symbol} ${index}`}>{stock.name}</div>
          //   <div key={`${stock.symbol} ${index} price`}>{stock.price}</div>
          // </div>
        );
      });
      setWatchList(arr);
    }
  }, [data, index]);

  return (
    <>
        { watchList && (
      <div class='table-div'>
              <TableContainer component={Paper} style={{ width: 700 }}>
        <Table style={{ width: 700 }}  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stock Name</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchList.map((row) => (
              <TableRow
                key={row.symbol}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.symbol}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

    )}
    </>


  );
}
