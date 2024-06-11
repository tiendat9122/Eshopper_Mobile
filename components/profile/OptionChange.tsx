import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

import ChangeInfo from "./ChangeInfo";
import ChangePassword from "./ChangePassword";
import HeaderUser from "../user/HeaderUser";

const OptionChange = ({ navigation }: any) => {
  return (
    <>
      <HeaderUser
        title="Thay đổi thông tin"
        navigation={navigation}
        backButton={true}
      />
      <ScrollView style={{ backgroundColor: "#ffffff" }}>
        <View>
          <TouchableOpacity
            style={styles.optionBlock}
            onPress={() => navigation.navigate("ChangeInfo")}
          >
            <View style={styles.titleOption}>
              <Icon name="user-o" size={20} />
              <Text style={styles.titleName}>Hồ sơ của tôi</Text>
            </View>
            <Icon name="angle-right" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionBlock}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <View style={styles.titleOption}>
              <Icon name="key" size={20} />
              <Text style={styles.titleName}>Đổi mật khẩu</Text>
            </View>
            <Icon name="angle-right" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  optionBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  titleOption: {
    flexDirection: "row",
  },
  titleIcon: {
    paddingRight: 10,
  },
  titleName: {
    marginLeft: 15,
  },
});

export default OptionChange;
