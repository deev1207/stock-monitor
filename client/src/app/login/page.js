"use client"
import { useState } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import styles from './styles.module.css'
import { useRouter } from "next/navigation";


export default function SignUp() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const router = useRouter();

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      const url = window.location.href;
      const parts = url.split("/");
      const endpt = parts[parts.length - 1];
      console.log(endpt);
      const res = await axios.post(`http://localhost:8000/${endpt}`, {
        username,
        password,
      });
      console.log(res);
      localStorage.setItem("username", username);
      setError(false)
      router.push("/");
    } catch (err) {
      console.log(err);
      router.push("/login");
      setError(true)

    }
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className={styles.login}>

        <Box
          sx={{
            '& > :not(style)': { m: 3, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Username" variant="outlined" value={username}
            onChange={(e) => setUserName(e.target.value)} />

        </Box>

        <Box
          sx={{
            '& > :not(style)': { mt:3, mr: 0, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Password" variant="outlined" value={password}
            onChange={(e) => setPassword(e.target.value)} />

        </Box>

        <Stack sx={{ m: 3}} direction="row" spacing={2}>
          <Button  variant="outlined" color="success" type="submit">
            Submit
          </Button>
        </Stack>
      </div>


    </form>

    {error && (
      <div className={styles.login}>
        <Stack sx={{ width: '20%', margin:2}} spacing={2}>
          <Alert variant="outlined" severity="error">
            Incorrect username or password
          </Alert>
        </Stack>
      </div>

    )}
  </>
  );
}
