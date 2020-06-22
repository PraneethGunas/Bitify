import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { newContextComponents } from "@drizzle/react-components";
import { firestore } from "../firebase";
import { AppContext } from "./AppContext";
import Collector from "../artifacts/Collector.json";
import Web3 from "web3";

var contract = require("@truffle/contract");
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [userType, setUser] = React.useState("Listener");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [walletID, setWallet] = React.useState("");
  const history = useHistory();
  const { drizzle, drizzleState } = React.useContext(AppContext);
  const { AccountData, ContractData, ContractForm } = newContextComponents;
  const collector = contract(Collector);
  collector.setProvider(drizzle.web3.currentProvider.url);
  collector.setNetwork(5777);
  const changeUser = (event) => {
    setUser(event.target.value);
  };
  const web3 = new Web3("ws://127.0.0.1:7545");

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "firstName") {
      setFname(value);
    } else if (name === "lastName") {
      setLname(value);
    } else {
      setWallet(value);
    }
  };

  const collect100 = async (key) => {
    try {
      if (walletID) {
        // const instance = await collector.deployed();
        // const transaction = await instance.methods[
        //   "register()"
        // ].sendTransaction({ from: walletID, value: 100000000000000000000 });
        // console.log(transaction);
        const sender = walletID;
        const receiver = drizzleState.accounts["0"];
        const valueToSend = 100000000000000000000;
        const transactionObject = {
          from: sender,
          to: receiver,
          value: valueToSend,
        };
        await web3.eth.sendTransaction(transactionObject);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const updateArtist = async () => {
    await db
      .collection("artists")
      .doc(walletID)
      .set({
        count: 0,
        name: fname + " " + lname,
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              const docRef = await db.collection("users").doc(walletID);
              const user = await docRef.get();
              if (user.data().type) {
                alert("Wallet in use by " + user.data().name);
                return;
              }
              if (userType === "Listener") {
                alert("100 Ethers will be deducted");
                const key = prompt(
                  "Enter the private key to make the transaction"
                );
                await collect100(key);
              }
              if (userType === "Artist") {
                await updateArtist();
              }
              if (user) {
                const obj = {
                  name: fname + " " + lname,
                  type: userType,
                };
                docRef
                  .update(obj)
                  .then(() => {
                    localStorage.setItem(
                      "user",
                      JSON.stringify({ ...obj, walletid: walletID })
                    );
                    setUser({ ...obj, walletid: walletID });
                    history.push("/home");
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("Error signing up!");
                  });
              } else {
                alert("Enter a valid Wallet address");
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={fname}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lname}
                variant="outlined"
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={walletID}
                variant="outlined"
                fullWidth
                label="Wallet ID"
                name="walletid"
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">User Type</FormLabel>
                <RadioGroup
                  aria-label="User Type"
                  name="User Type"
                  value={userType}
                  onChange={(event) => changeUser(event)}
                >
                  <FormControlLabel
                    value="Listener"
                    control={<Radio />}
                    label="Listener"
                  />
                  <FormControlLabel
                    value="Artist"
                    control={<Radio />}
                    label="Artist"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login">{"Alerady have an account? Sign-In"}</Link>
            </Grid>
          </Grid>
        </form>
        {/* <ContractForm
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="Collector"
          method="register"
          labels={["100 ethers will be transfered!"]}
        /> */}
      </div>
    </Container>
  );
}
