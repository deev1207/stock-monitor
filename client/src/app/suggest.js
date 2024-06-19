import './globals.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function createData(name, symbol, add) {
  return { name, symbol, add };
}

export default function Suggest({ stocks, handleStock, childRef }) {
  const handleClick = (stock) => {
    handleStock(stock);
  };
  const stocks_arr = [];
  for (const item of stocks) {
    stocks_arr.push(
      createData(item["name"], item["symbol"], <Stack direction="row" spacing={2}   justifyContent="center">
        <Button style={{ margin: 10 }}  variant="outlined" color="error" onClick={() => handleClick(item)}>
          +
        </Button>
      </Stack>)
      // <>

      //   <div className="test">
      //     <div className="stock">{item["name"]}</div>
      //     <div className="stock">{item["symbol"]}</div>
      //     <button onClick={() => handleClick(item)}>add</button>
      //   </div>
      // </>
    );
  }
  console.log(stocks_arr);

  return (
    <>
      <div class='table-div'>
        <TableContainer component={Paper} style={{ width: 700 }}>
          <Table ref={childRef} style={{ width: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Stock Name</TableCell>
                <TableCell align='right'>Symbol</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks_arr.map((row) => (
                <TableRow
                  key={row.symbol}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.symbol}</TableCell>
                  <TableCell align="right">{row.add}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <div className="stocks-container">{stocks_arr}</div> */}
    </>
  );
}
