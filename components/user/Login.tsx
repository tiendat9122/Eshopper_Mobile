import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Icon from "@expo/vector-icons/FontAwesome";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { passLogin } from "@/redux/loginSlice";
import { increse, selectCount } from "@/redux/countSlice";
import { localhostAddress } from "@/config/config";
import LogoE from "../common/Logo";

interface DecodedToken {
  sub: string;
  exp: number;
  userId: number;
  role: string[];
}

const Login = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isDisable, setIsDisable] = React.useState(false);

  React.useEffect(() => {
    if (email !== "" && password !== "") {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const saveTokenInStorage = async (token: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(token, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const saveUserInfoInStorage = (token: string, user: any, jwt: any) => {
    fetch(`${localhostAddress}/eshopper/user?id=` + user.userId, {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          saveTokenInStorage(token, data);
          dispatch(passLogin(JSON.stringify(jwt)));
        });
      } else {
        console.log("Called API faily");
      }
    });
  };

  const onsubmit = () => {
    let submitData = {
      email,
      password,
    };

    fetch(`${localhostAddress}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          saveTokenInStorage("jwt", data);
          const decoded = jwtDecode<JwtPayload>(data.token);
          saveUserInfoInStorage("user", decoded, data);
        });
      } else {
        Alert.alert("Tài khoản hoặc mật khẩu không đúng!");
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LogoE />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Nhập email"
          style={styles.textInput}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Nhập mật khẩu"
          style={styles.textInput}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.submit, !isDisable && { opacity: 0.5 }]}
          onPress={() => onsubmit()}
          disabled={!isDisable}
        >
          <Text style={styles.text}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotStack")}>
          <Text style={{ fontWeight: 700, fontSize: 16, color: "#f79802" }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logogroup: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    borderColor: "#960019",
  },
  logoIcon: {
    color: "#960019",
  },
  textInput: {
    backgroundColor: "#ffffff",
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
    backgroundColor: "#960019",
    padding: 10,
    minWidth: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 5,
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Login;
