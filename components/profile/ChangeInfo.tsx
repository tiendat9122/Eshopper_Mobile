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

const ChangeInfo = ({ navigation }: any) => {
  const user = useAppSelector(selectUser);
  const jwt = useAppSelector(selectJwt);
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = React.useState("");
  const [userName, setuserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [birthDay, setBirthDay] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isButton, setIsButton] = React.useState(false);

  React.useEffect(() => {
    if (
      fullName !== "" &&
      userName !== "" &&
      email !== "" &&
      birthDay !== "" &&
      address !== ""
    ) {
      setIsButton(true);
    } else {
      setIsButton(false);
    }
  }, [fullName, userName, email, birthDay, address]);

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
            <Text style={styles.titleBox}>Họ và tên</Text>
            <TextInput
              placeholder="Nhập họ và tên"
              style={styles.inputBox}
            />
          </View>
          <View style={styles.groupBox}>
            <Text style={styles.titleBox}>Tên đăng nhập</Text>
            <TextInput
              placeholder="Nhập tên đăng nhập"
              style={styles.inputBox}
            />
          </View>
          <View style={styles.groupBox}>
            <Text style={styles.titleBox}>Địa chỉ Email</Text>
            <TextInput
              placeholder="Nhập địa chỉ Email"
              style={styles.inputBox}
            />
          </View>
          <View style={styles.groupBox}>
            <Text style={styles.titleBox}>Ngày sinh</Text>
            <TextInput
              placeholder="Nhập ngày sinh"
              style={styles.inputBox}
            />
          </View>
          <View style={styles.groupBox}>
            <Text style={styles.titleBox}>Địa chỉ</Text>
            <TextInput
              placeholder="Nhập địa chỉ"
              style={styles.inputBox}
            />
          </View>
          <View style={styles.groupBox}>
            <Text style={styles.titleBox}>Số điện thoại</Text>
            <TextInput
              placeholder="Nhập số điện thoại"
              style={styles.inputBox}
            />
          </View>
          <TouchableOpacity
            style={[styles.confirmBtn, !isButton && { opacity: 0.6 }]}
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

export default ChangeInfo;
