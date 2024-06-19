// src/app/page.js

"use client";

import { useState, useRef, useEffect } from "react";
import AddWatchList from "./addwatchlist";
import WatchList from "./watchlist";
import Suggest from "./suggest";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import styles from './page.module.css';

const Home = () => {
  const [data, setData] = useState([]);
  const childRef = useRef(null);
  const [text, setText] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [display, setDisplay] = useState(false);
  const [focus, setFocus] = useState(true);
  const vis = useRef(true);
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      router.replace('/login');
    }
  }, [router]);
  
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      axios
        .get(`https://stock-tool-server.onrender.com/getWatchListByUsername?username=${username}`)
        .then((res) => {
          setData(res.data.watchList);
        })
        .catch(() => {
          router.push("/login");
        });
    } else {
      // router.push("/login");
    }
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log(data);
    if (data.length > 0) {
      axios
        .post("https://stock-tool-server.onrender.com/createList", {
          username,
          watchList: data,
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  useEffect(() => {
    if (text === "") {
      setDisplay(false);
      vis.current = true;
    } else {
      axios
        .get(
          `https://financialmodelingprep.com/api/v3/search?query=${text}&limit=5&apikey=oeZLpIgP4LF3FTjHiCD4or43Lz9EEpE5`
        )
        .then((response) => {
          setSuggest(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [text]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (childRef.current && !childRef.current.contains(event.target)) {
        if (!focus) {
          setDisplay(false);
          vis.current = true;
        }
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [focus]);

  const handleChange = (e) => {
    setText(e.target.value);
    setDisplay(true);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleStock = (stock) => {
    const new_data = [...data];
    if (!new_data[current]) {
      new_data[current] = [];
    }

    axios
      .get(
        `https://financialmodelingprep.com/api/v3/profile/${stock.symbol}?apikey=oeZLpIgP4LF3FTjHiCD4or43Lz9EEpE5 `
      )
      .then((response) => {
        if (response.data.length > 0) {
          new_data[current].push({
            name: stock.name,
            symbol: stock.symbol,
            price: response.data[0].price,
          });
          setData(new_data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addWatchList = (index) => {
    vis.current = false;
    setCurrent(index);
  };

  const switchWatchList = (index) => {
    vis.current = true;
    setCurrent(index);
  };

  const deleteWatchList = (index) => {
    setData((prev) => {
      return prev.slice(0, -1);
    });
    if(index-1<0){
      setCurrent(0);
    }
    else{
      setCurrent(index - 1);
    }

  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    await axios.get("https://stock-tool-server.onrender.com/logout");
    router.push("/login");
  };

  return (
    <>
      <div className={styles.header}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Add Stocks"
            variant="outlined"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>

        <Stack direction="row" spacing={2}>
          <Button style={{ margin: 10 }} variant="outlined" color="error" onClick={handleLogout}>
            Log Out
          </Button>
        </Stack>
      </div>

      {display ? (
        <div >
          {suggest && <Suggest stocks={suggest} childRef={childRef} handleStock={handleStock} />}
        </div>
      ) : (
        vis.current && data.length > 0 && <WatchList data={data[current]} index={current} />
      )}
      {data.length > 0 && (
        <AddWatchList
          switchWatchList={switchWatchList}
          len={data.length - 1}
          deleteWatchList={deleteWatchList}
          addWatchList={addWatchList}
        />
      )}
    </>
  );
};

export default Home;
