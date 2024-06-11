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

import Header from "../user/HeaderUser";
import { localhostAddress } from "@/config/config";
import LogoE from "../common/Logo";

const CheckEmail = ({ navigation }: any) => {
  const [email, setEmail] = React.useState("");
  const [isButton, setIsButton] = React.useState(false);

  React.useEffect(() => {
    if (email !== "") {
      setIsButton(true);
    } else {
      setIsButton(false);
    }
  }, [email]);

  const handleCheckEmail = () => {
    let checkEmailData = {
      email,
    };

    fetch(`${localhostAddress}/userauth/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkEmailData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          navigation.navigate("ConfirmCode", { userId: data.id });
        });
      } else {
        Alert.alert("Email không tồn tại!");
      }
    });
  };

  return (
    <>
      <Header title="Quên mật khẩu" navigation={navigation} backButton={true} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LogoE />
        <View style={styles.fromGroup}>
          <TextInput
            placeholder="Nhập email"
            style={styles.textInput}
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={[styles.submit, !isButton && { opacity: 0.5 }]}
            onPress={() => handleCheckEmail()}
            disabled={!isButton}
          >
            <Text style={styles.text}>Lấy mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fromGroup: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: 250,
    margin: 5,
    borderColor: "#ccc",
    borderRadius: 5,
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
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default CheckEmail;
