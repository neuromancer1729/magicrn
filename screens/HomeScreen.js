import React from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

console.disableYellowBox = true;

export default function HomeScreen () {

  const [email, onChangeEmail] = React.useState('jerry@fortmatic.com');
  const [publicAddress, updatePublicAddress] = React.useState('');

  const [toAddress, onChangeToAddress] = React.useState('0x01568bf1c1699bb9d58fac67f3a487b28ab4ab2d');
  const [transactionHash, updateTransactionHash] = React.useState('');

  const login = async () => {

    try {
      if (!await fmPhantom.user.isLoggedIn()) {

        await fmPhantom.loginWithMagicLink({email: email});
      }

      const account = await web3.eth.getAccounts();
      updatePublicAddress(account[0]);
      console.log('accounts: ', account);
    } catch(err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await fmPhantom.user.logout();
    updatePublicAddress('');
  };

  const sendTransaction = async () => {
    const hash = await web3.eth.sendTransaction({
      from: publicAddress,
      to: toAddress,
      value: web3.utils.toWei('0.000001', 'ether')
    });
    updateTransactionHash(hash.transactionHash);
    console.log('transaction hash:', hash);
  };

  return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          {/* Login section */}
          <View style={styles.loginContainer}>
            <View style={styles.emailContainer}>
              <Text>
                Email:
              </Text>
              <TextInput
                  style={styles.TextInputContainer}
                  onChangeText={text => onChangeEmail(text)}
                  value={email}
              />
            </View>
            <Text style={styles.publicAddress}>
              Public Address: {publicAddress}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <Button onPress={() => login()}  title="Login" />
            <Button onPress={() => logout()}  title="Logout" />
          </View>

          {/* Send Transaction section */}
          <View style={styles.loginContainer}>
            <View style={styles.emailContainer}>
              <Text>
                To:
              </Text>
              <TextInput
                  style={styles.TextInputContainer}
                  onChangeText={text => onChangeToAddress(text)}
                  value={toAddress}
              />
            </View>
            <Text style={styles.publicAddress}>
              Transaction Hash: {transactionHash}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <Button onPress={() => sendTransaction()}  title="Send" />
          </View>
        </ScrollView>
      </View>
  );
}



HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  TextInputContainer: {
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    height: 30,
    paddingHorizontal: 10
  },
  contentContainer: {
    paddingTop: 30,
  },
  loginContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  emailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    alignSelf: 'center'
  },
  publicAddress: {
    alignSelf: 'flex-start',
    marginTop: 10
  }
});
