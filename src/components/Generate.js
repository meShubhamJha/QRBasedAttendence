import React, { Component } from "react";
import QRCode from "qrcode";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

export default class Generate extends Component {
  constructor(props) {
    super(props);
    this.generateQrCode = this.generateQrCode.bind(this);
    this.state = {
      text: "",
      imageUrl: "",
    };
  }

  useStyles = makeStyles((theme) => ({
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
      marginTop: 10,
      marginBottom: 20,
    },
  }));

  classes = this.useStyles();
  generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(this.state.text);
      this.setState({ imageUrl: response });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Container className={this.classes.conatiner}>
          <Card>
            <h2 className={this.classes.title}>
              Generate Download & Scan QR Code with React js
            </h2>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <TextField
                    label="Enter Text Here"
                    onChange={(e) => this.setState({ text: e.target.value })}
                  />
                  <Button
                    className={this.classes.btn}
                    variant="contained"
                    color="primary"
                    onClick={this.generateQrCode()}
                  >
                    Generate
                  </Button>
                  <br />
                  <br />
                  <br />
                  {this.state.imageUrl ? (
                    <a href={this.state.imageUrl} download>
                      <img src={this.state.imageUrl} alt="img" />
                    </a>
                  ) : null}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
}
