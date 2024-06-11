import * as React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

const HeaderFiltered = ({ navigation, backBtn }: any) => {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#960019"
        hidden={false}
        barStyle="light-content"
      />

      <View style={styles.headerWrap}>
        {backBtn && (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.goBack()}
          >
            <IconF5 name="arrow-left" size={17} style={{ color: "#ffffff" }} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 3,
            flex: 8.5,
            height: 27,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Search")}
        >
          <View style={{ flexDirection: "row", gap: 5, marginLeft: 5 }}>
            <IconF5 name="search" size={17} style={{ color: "#ccc" }} />
            <Text
              style={{
                color: "#909090",
                borderRadius: 3,
              }}
            >
              Tìm kiếm...
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconF5 name="shopping-basket" size={20} style={styles.cartIcon} />
        </TouchableOpacity>
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
    paddingHorizontal: 15,
  },
  searchInput: {
    minWidth: "85%",
    height: 30,
    backgroundColor: "#ffffff",
    paddingLeft: 30,
    paddingRight: 10,
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
  cartIcon: {
    color: "#ffffff",
  },
});

export default HeaderFiltered;
