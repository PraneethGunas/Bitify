import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [userType, setUser] = React.useState("Listner");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [walletID, setWallet] = React.useState("");

  const { drizzle, drizzleState } = React.useContext(AppContext);
  const { AccountData, ContractData, ContractForm } = newContextComponents;
  const collector = contract(Collector);
  collector.setProvider(drizzle.web3.currentProvider.url);
  collector.setNetwork(5777);
  const changeUser = (event) => {
    setUser(event.target.value);
  };

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
        collector.deployed().then((instance) => {
          instance.methods["register()"]
            .sendTransaction({ from: walletID, value: 100000000000000000000 })
            .then(console.log);
        });
      }
    } catch (error) {
      console.error(error);
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
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              const check = await db.collection("users").doc(walletID).get();
              if (check.data().name) {
                alert("Wallet in use by " + check.data().name);
                return;
              }
              alert("100 Ethers will be deducted");
              const key = prompt(
                "Enter the private key to make the transaction"
              );
              collect100(key);
              const docRef = await db.collection("users").doc(walletID);
              const user = await docRef.get();
              if (user) {
                docRef
                  .set({
                    name: fname + " " + lname,
                    walletid: walletID,
                    type: userType,
                  })
                  .then(() => {
                    alert("Signed up successfully!");
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("Error signing up!");
                  });
              } else {
                alert("Enter a valid Wallet addredd");
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
                    value="Listner"
                    control={<Radio />}
                    label="Listner"
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
