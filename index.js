import Axios from "axios";
import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

class SSL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      html: ``
    };
  }

  componentDidMount() {
    this.getPaymentPage();
  }

  getPaymentPage = async () => {
    try {
      let payload = {
        mb_id: "5e257f2363fa1f3f4029abaa"
      };
      let { data } = await Axios.post(payment_url, payload);

      let html = `<html>
      <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
      <a href="${data.response.GatewayPageURL}">
      Pay Now</a>
      
      <html><body>`;
      this.setState({ html: html, loading: false });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.state.loading ? (
          <WebView
            source={{ html: this.state.html, baseUrl: "web/" }}
            mixedContentMode='always'
            style={{ flex: 1 }}
            // onMessage={event => {
            //   let message = event.nativeEvent.data;
            //   console.log(message);
            //   if (message === "payment completed") {
            //   }
            // }}
          />
        ) : null}
      </View>
    );
  }
}

export default SSL;
