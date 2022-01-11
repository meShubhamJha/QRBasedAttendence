import React, { useState, useRef } from "react";
import randomToken from "random-token";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import QRCode from "qrcode";

function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [batch, setBatch] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const classes = useStyles();
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      var randomToken = require("random-token");
      var token = randomToken(8);
      const response = await QRCode.toDataURL(text + ";" + batch + ";" + token);
      axios
        .post(
          "https://w9datqs193.execute-api.ap-south-1.amazonaws.com/default/QRCODE",
          {
            token: token,
            date: text,
            batch: batch,
          }
        )
        .then((res) => {
          console.log(res);
        });
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };
  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>QR Based Attendence System</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              Choose Date :
              <br />
              <br />
              <TextField
                type="date"
                onChange={(e) => setText(e.target.value)}
              />
              <br />
              <br />
              Choose Class
              <br />
              <Select
                labelId="label"
                id="select"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              >
                <MenuItem value="A">DSA Cse 1</MenuItem>
                <MenuItem value="B">Data Sci Cse 3</MenuItem>
                <MenuItem value="C">Physics Cse 1</MenuItem>
              </Select>
              <br />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => generateQrCode()}
              >
                Start Accepting
              </Button>
              <br />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => setImageUrl("")}
              >
                Stop Accepting
              </Button>
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img height={"400px"} src={imageUrl} alt="img" />
                </a>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 15,
    marginBottom: 0,
  },
}));
export default App;
