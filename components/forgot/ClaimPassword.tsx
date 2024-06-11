import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import Header from "../user/HeaderUser";
import { localhostAddress } from "@/config/config";
import LogoE from "../common/Logo";

const ClaimPassword = ({ navigation, route }: any) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [isButton, setIsButton] = React.useState(false);

  React.useEffect(() => {
    if (password !== "" && confirmPassword !== "") {
      setIsButton(true);
    } else {
      setIsButton(false);
    }
  }, [password, confirmPassword]);

  const handleClaimPassword = () => {
    if (password !== confirmPassword) {
      Alert.alert("Mật khẩu chưa khớp!");
      return;
    }

    let newPasswordData = {
      email: route.params.email,
      password,
    };

    fetch(`${localhostAddress}/userauth/newpassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPasswordData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          Alert.alert("Lấy lại mật khẩu thành công!");
          navigation.navigate("Authenticate");
        });
      } else {
        Alert.alert("Lấy lại mật khẩu thất bại!");
      }
    });
  };

  return (
    <>
      <Header title="Quên mật khẩu" navigation={navigation} backButton={true} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LogoE />
        <View style={styles.formGroup}>
          <TextInput
            placeholder="Nhập mật khẩu mới"
            style={styles.textInput}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Nhập lại mật khẩu mới"
            style={styles.textInput}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={[styles.submit, !isButton && { opacity: 0.5 }]}
            onPress={() => handleClaimPassword()}
            disabled={!isButton}
          >
            <Text style={styles.text}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: 250,
    margin: 5,
    borderRadius: 5,
    borderColor: "#ccc",
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
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ClaimPassword;
