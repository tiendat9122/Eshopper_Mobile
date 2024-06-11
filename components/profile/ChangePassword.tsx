import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

import HeaderUser from "../user/HeaderUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { localhostAddress } from "@/config/config";
import { selectUser } from "@/redux/userSlice";
import { selectJwt } from "@/redux/jwtSlice";
import { setUser } from "@/redux/userSlice";

const ChangePassword = ({ navigation }: any) => {
  const user = useAppSelector(selectUser);
  const jwt = useAppSelector(selectJwt);
  const dispatch = useAppDispatch();

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isButton, setIsButton] = React.useState(false);

  React.useEffect(() => {
    if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
      setIsButton(true);
    } else {
      setIsButton(false);
    }
  }, [oldPassword, newPassword, confirmPassword]);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Mật khẩu mới không khớp");
      return;
    }

    const dataSubmit = {
      password: oldPassword,
      newPassword: newPassword,
    };

    fetch(`${localhostAddress}/eshopper/password?id=` + user.id, {
      headers: {
        Authorization: "Bearer " + jwt.token,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(dataSubmit),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          Alert.alert("Đổi mật khẩu thành công");
          navigation.goBack();
        });
      } else if (res.status === 404) {
        Alert.alert("Lỗi: Mật khẩu cũ không chính xác");
      }
    });
  };

  return (
    <>
      <HeaderUser
        title="Đổi mật khẩu"
        navigation={navigation}
        backButton={true}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.wapper}>
          <View style={styles.groupBox}>
            <Text style={styles.titleBox}>Mật khẩu cũ</Text>
            <TextInput
              placeholder="Nhập mật khẩu cũ"
              value={oldPassword}
              style={styles.inputBox}
              onChangeText={setOldPassword}
            />
          </View>
          <View style={styles.groupBox}>
            <Text style={styles.titleBox}>Nhập mật khẩu mới</Text>
            <TextInput
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              style={styles.inputBox}
              onChangeText={setNewPassword}
            />
          </View>
          <View style={styles.groupBox}>
            <Text style={styles.titleBox}>Xác nhận mật khẩu mới</Text>
            <TextInput
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              style={styles.inputBox}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.confirmBtn, !isButton && { opacity: 0.6 }]}
            onPress={() => handleChangePassword()}
            disabled={!isButton}
          >
            <Icon name="check" size={20} style={{ color: "#ffffff" }} />
            <Text style={styles.confirmBtnText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  confirmBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f79802",
    minWidth: "60%",
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 50,
  },
  confirmBtnText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },
  wapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  groupBox: {
    marginTop: 5,
  },
  titleBox: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  scrollView: {
    backgroundColor: "#ffffff",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: "85%",
    minWidth: "85%",
    margin: 5,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default ChangePassword;
