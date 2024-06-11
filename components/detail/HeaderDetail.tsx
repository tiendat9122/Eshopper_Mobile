import * as React from "react";
import { View, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

const HeaderDetail = ({ navigation }: any) => {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#960019"
        hidden={false}
        barStyle="light-content"
      />

      <View style={styles.headerWrap}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <IconF5 name="arrow-left" size={17} style={{ color: "#ffffff" }} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            width: 100,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SearchStack")}>
            <IconF5 name="search" size={20} style={{ color: "#ffffff" }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <IconF5 name="home" size={20} style={{ color: "#ffffff" }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <IconF5
              name="shopping-basket"
              size={20}
              style={{ color: "#ffffff" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: "#960019",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 23,
  },
  inputForm: {
    marginLeft: 50,
  },
  searchInput: {
    minWidth: "85%",
    height: 30,
    backgroundColor: "#ffffff",
    paddingLeft: 30,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  searchIcon: {
    color: "#ccc",
    position: "absolute",
    zIndex: 1,
    top: 6,
    left: 6,
  },
});

export default HeaderDetail;
