import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TopTabUnauthorize = ({ navigation, setSwap, swap }: any) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.button, swap && { borderBottomWidth: 2, borderColor: "#960019" }]}
        onPress={() => setSwap(true)}
      >
        <Text style={styles.text}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !swap && { borderBottomWidth: 2, borderColor: "#960019" }]}
        onPress={() => setSwap(false)}
      >
        <Text style={styles.text}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    height: 50,
  },
  button: {
    backgroundColor: "#fff",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default TopTabUnauthorize;
