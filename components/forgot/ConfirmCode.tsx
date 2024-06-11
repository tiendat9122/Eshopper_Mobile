import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

import Header from "../user/HeaderUser";
import { localhostAddress } from "@/config/config";

const ClaimPassword = ({ navigation, route }: any) => {
  const [code, setCode] = React.useState("");
  const [isDisable, setIsDisable] = React.useState(true);

  const onChangeCodeData = (text: any) => {
    setCode(text);
    if (text.length == 6) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  const handleCheckCode = () => {
    let codeData = {
      userId: route.params.userId,
      code,
    };

    fetch(`${localhostAddress}/userauth/verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codeData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          navigation.navigate("ClaimPassword", { email: data.email });
        });
      } else {
        Alert.alert("Mã OTP không đúng!");
      }
    });
  };

  return (
    <>
      <Header title="Quên mật khẩu" navigation={navigation} backButton={true} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nhập mã OTP</Text>

        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onTextChange={(text) => onChangeCodeData(text)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />

        <TouchableOpacity
          disabled={isDisable}
          activeOpacity={0.7}
          style={[styles.submit, isDisable && { opacity: 0.5 }]}
          onPress={() => handleCheckCode()}
        >
          <Text style={styles.text}>Xác minh</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: 250,
    margin: 5,
  },
  submit: {
    backgroundColor: "#f79802",
    padding: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 50,
  },
  text: {
    color: "#ffffff",
    fontWeight: 'bold',
    fontSize: 15,
  },
  container: {
    width: 300,
    margin: 10,
  },
  pinCodeContainer: {},
  pinCodeText: {},
  focusStick: {},
  activePinCodeContainer: {},
});

export default ClaimPassword;
