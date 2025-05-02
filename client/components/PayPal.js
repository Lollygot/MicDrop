import React from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PayPalWebView() {
    const handleMessage = (event) => {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.approvalUrl) {
            Linking.openURL(data.approvalUrl);
        } else if (data.error) {
            Alert.alert('PayPal Error', data.error);
        }
    };

    const paypalHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>PayPal Checkout Redirect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://www.paypal.com/sdk/js?client-id=AZLiYd_GTMoSgq45by8Z3Z66NrMAE-EfUBtTiwaqBSjRsbTDArpdCb0s_9Yz_xF9g7G0HgV-xFBi9aKI

&components=buttons"></script>
      </head>
      <body>
        <div id="paypal-button-container"></div>
        <script>
          paypal.Buttons({
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '10.00'
                  }
                }]
              }).then(function(orderID) {
                return actions.order.get(orderID).then(function(orderDetails) {
                  const approvalUrl = orderDetails.links.find(link => link.rel === 'approve').href;
                  window.ReactNativeWebView.postMessage(JSON.stringify({ approvalUrl }));
                  return orderID;
                });
              });
            },
            onError: function(err) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ error: err.message }));
            }
          }).render('#paypal-button-container');
        </script>
      </body>
    </html>
  `;

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: paypalHtml }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                onMessage={handleMessage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
