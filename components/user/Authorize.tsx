import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@expo/vector-icons/FontAwesome";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/loginSlice";
import Header from "./HeaderUser";
import { localhostAddress } from "@/config/config";
import { selectUser } from "@/redux/userSlice";
import { setUser, removeUser } from "@/redux/userSlice";
import { setJwt } from "@/redux/jwtSlice";

const Authorize = ({ navigation }: any) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const _retrieveData = async () => {
      try {
        const jwtTokenJson = await AsyncStorage.getItem("jwt");
        const userTokenJson = await AsyncStorage.getItem("user");
        if (jwtTokenJson !== null && userTokenJson !== null) {
          const userObject = JSON.parse(userTokenJson);
          const jwtObject = JSON.parse(jwtTokenJson);
          dispatch(setUser(userObject));
          dispatch(setJwt(jwtObject));
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
  }, []);

  const removeDataInStorage = async (key: any) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    removeDataInStorage("jwt");
    removeDataInStorage("user");
    dispatch(logout());
    dispatch(removeUser());
    navigation.navigate("Authenticate");
  };

  return (
    <>
      <Header title="Thông tin cá nhân" />

      <ScrollView>
        <View style={styles.hero}>
          <Image
            style={styles.avatar}
            source={
              user.avatar
                ? {
                    uri: `${localhostAddress}/eshopper/download/` + user.avatar,
                  }
                : require("../../assets/images/default_avatar.jpg")
            }
          />
          <Text style={styles.name}>{user.full_name}</Text>
          <Text style={styles.point}>Điểm tích lũy 2024: 0 F-Point</Text>
        </View>

        <View style={styles.info}>
          <Text>Thông tin tài khoản</Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("ProfileStack")}
          >
            <Text style={styles.editBtnTitle}>Chỉnh sửa</Text>
            <Icon name="angle-right" size={17} />
          </TouchableOpacity>
        </View>

        <View style={styles.detailInfo}>
          <View style={styles.infoProperty}>
            <View style={styles.infoTitle}>
              <Icon name="user" size={17} style={styles.infoIcon} />
              <Text style={styles.infoTitleText}>Họ và tên</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoContentText}>{user.full_name}</Text>
            </View>
          </View>
          <View style={styles.infoProperty}>
            <View style={styles.infoTitle}>
              <Icon name="envelope" size={17} style={styles.infoIcon} />
              <Text style={styles.infoTitleText}>Email</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoContentText}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.infoProperty}>
            <View style={styles.infoTitle}>
              <Icon name="phone" size={17} style={styles.infoIcon} />
              <Text style={styles.infoTitleText}>Số điện thoại</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoContentText}>{user.phone_number}</Text>
            </View>
          </View>
          <View style={styles.infoProperty}>
            <View style={styles.infoTitle}>
              <Icon name="birthday-cake" size={17} style={styles.infoIcon} />
              <Text style={styles.infoTitleText}>Ngày sinh</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoContentText}>{user.birth_day}</Text>
            </View>
          </View>
          <View style={styles.infoProperty}>
            <View style={styles.infoTitle}>
              <Icon name="map-marker" size={17} style={styles.infoIcon} />
              <Text style={styles.infoTitleText}>Địa chỉ</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoContentText}>{user.address}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => handleLogout()}
        >
          <Text style={styles.logoutText}>Đăng xuất</Text>
          <Icon name="sign-out" size={20} style={{ color: "#ffffff" }} />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  infoIcon: {
    minWidth: 25,
  },
  hero: {
    height: 200,
    backgroundColor: "#ffffff",
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 50,
    alignSelf: "center",
  },
  name: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  point: {
    fontSize: 16,
    fontWeight: "500",
    color: "orange",
    alignSelf: "center",
  },
  line: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  block: {
    height: 40,
    width: 40,
    backgroundColor: "#ccc",
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
  },
  score: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
  info: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 45,
    backgroundColor: "#ffffff",
  },
  detailInfo: {
    marginTop: 3,
    backgroundColor: "#ffffff",
  },
  infoProperty: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    alignItems: "center",
  },
  infoTitle: {
    width: 160,
    flexDirection: "row",
  },
  infoTitleText: {},
  infoContent: {},
  infoContentText: {},
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "red",
    margin: 10,
    padding: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  logoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f79802", //Orange
    width: "80%",
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 10,
  },
  editBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editBtnTitle: {
    marginRight: 7,
  },
});

export default Authorize;
