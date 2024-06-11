import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

import { localhostAddress } from "@/config/config";
import LogoE from "../common/Logo";

const Register = ({ navigation }: any) => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isButton, setIsButton] = React.useState(false);

  React.useEffect(() => {
    if (
      fullName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      password !== ""
    ) {
      setIsButton(true);
    } else {
      setIsButton(false);
    }
  }, [fullName, email, phoneNumber, password]);

  const registerHandle = () => {
    let registerData = {
      full_name: fullName,
      user_name: "Chưa cập nhật",
      email: email,
      phone_number: phoneNumber,
      address: "Chưa cập nhật",
      password: password,
    };

    fetch(`${localhostAddress}/userauth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((success) => {
          console.log(success);
          setFullName("");
          setEmail("");
          setPhoneNumber("");
          setPassword("");
          Alert.alert("Đăng ký thành công");
        });
      } else {
        console.log("That bai");
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LogoE />
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Họ và tên"
          style={styles.textInput}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Địa chỉ email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Số điện thoại"
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Mật khẩu"
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.submit, !isButton && { opacity: 0.5 }]}
          onPress={() => registerHandle()}
          disabled={!isButton}
        >
          <Text style={styles.text}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logogroup: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    borderColor: "#960019",
  },
  logoIcon: {
    color: "#960019",
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
    marginTop: 5,
    backgroundColor: "#32612D", //Green
    padding: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Register;
