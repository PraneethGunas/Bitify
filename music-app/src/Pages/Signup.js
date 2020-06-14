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
import Web3 from "web3";
import Collector from "../artifacts/Collector.json";
import TruffleContract from "@truffle/contract";
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
  const web3 = new Web3.providers.HttpProvider("http://localhost:7545");
  const collector = TruffleContract(Collector);
  collector.setProvider(web3);
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

  const register = () => {
    if (walletID) {
      console.log(walletID);
      const transaction = {};
      web3.eth.sendTransaction(transaction, console.log);
      // collector.deployed().then((instance) => {
      //   instance.methods
      //     .register()
      //     .call({ from: walletID })
      //     .on("transactionHash", function (hash) {
      //       console.log(hash);
      //     })
      //     .on("receipt", function (receipt) {
      //       console.log(receipt);
      //     })
      //     .on("confirmation", function (confirmationNumber, receipt) {
      //       console.log(confirmationNumber, receipt);
      //     })
      //     .on("error", console.error);
      // });
    }
  };
  useEffect(() => {
    collector.deployed().then((instance) => {
      console.log(instance);
    });
  });
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
          onSubmit={(event) => {
            event.preventDefault();
            register();
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
