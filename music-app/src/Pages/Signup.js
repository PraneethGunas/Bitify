import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Web3 from "web3";
import TruffleContract from "@truffle/contract";
import { firestore } from "../firebase";
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

  const initBlockData = async () => {
    const web3 = new Web3("http://localhost:7545");
  };

  React.useEffect(() => {
    initBlockData();
  });
  const changeUser = (event) => {
    setUser(event.target.value);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "firstName") {
      setFname(value);
    } else if (name === "lastName") {
      setLname(value);
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
          onSubmit={(event) => {
            event.preventDefault();
            const name = fname + " " + lname;
            alert("transaction with: " + name + "\nUser Type:" + userType);
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
