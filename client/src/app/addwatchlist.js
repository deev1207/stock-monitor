import { useState } from "react";
import './globals.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AddWatchList({
  switchWatchList,
  len,
  deleteWatchList,
  addWatchList,
}) {
  const [count, setCount] = useState(len);
  let init = [];
  for (let i = 1; i <= len; i++) {
    init.push(
      <Button variant="outlined" onClick={() => handleButton(i)}>
        {i}
      </Button>
    );
  }
  const [arr, setArr] = useState(init);

  function handleButton(i) {
    switchWatchList(i);
  }

  function handleClickAdd() {
    setCount(count + 1);
    setArr((prvs) => {
      return [
        ...prvs,
        <Button variant="outlined"
          onClick={() => handleButton(count + 1)}
        >
          {count + 1}
        </Button>,

      ];
    });
    addWatchList(count + 1);
  }

  function handleClickMinus() {
    setArr((prvs) => {
      return prvs.slice(0, -1);
    });

    setCount(count - 1);
    deleteWatchList(count);
  }
  return (
    <>
    <div className="stack-container">
    <Stack spacing={2} direction="row">
        {arr}
        <Button variant="outlined" onClick={handleClickAdd}> +</Button>
        <Button variant="outlined" onClick={handleClickMinus}> - </Button>
      </Stack>
    </div>


    </>
  );
}
