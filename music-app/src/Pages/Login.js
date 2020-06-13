import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AppContext } from "./AppContext";

const db = firestore;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [walletID, setWalletID] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();
  const { setUser } = React.useContext(AppContext);

  const submitAction = async (event, walletID, username) => {
    try {
      event.preventDefault();
      const docRef = await db.collection("users").doc(walletID);
      const user = await docRef.get();
      if (user.exists) {
        setUser({ id: user.id });
        history.push("/home");
      } else {
        alert("No user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "walletid") {
      setWalletID(value);
    } else if (name === "username") {
      setUsername(value);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => submitAction(event, walletID, username)}
        >
          <TextField
            value={walletID}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="walletID"
            label="WalletID"
            name="walletid"
            autoFocus
            onChange={(event) => onChangeHandler(event)}
          />
          <TextField
            value={username}
            variant="outlined"
            margin="normal"
            fullWidth
            name="username"
            label="Username"
            type="username"
            id="username"
            onChange={(event) => onChangeHandler(event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
