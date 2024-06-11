import * as React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

const HeaderSearch = ({ navigation, backBtn }: any) => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#960019"
        hidden={false}
        barStyle="light-content"
      />

      <View style={styles.headerWrapper}>
        {backBtn && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <IconF5 name="arrow-left" size={17} style={{ color: "#ffffff" }} />
          </TouchableOpacity>
        )}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Tìm kiếm..."
            onChangeText={setSearchValue}
          />
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => navigation.navigate("Filtered", { searchValue })}
          >
            <IconF5 name="search" size={17} style={{ color: "#ffffff" }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartBtn}>
          <IconF5 name="shopping-basket" size={20} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartBtn: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: "100%",
    borderLeftWidth: 1,
    borderColor: "#333",
    backgroundColor: "#ccc",
  },
  textInput: {
    backgroundColor: "#ffffff",
    lineHeight: 27,
    paddingHorizontal: 5,
    flex: 1,
  },
  inputWrapper: {
    flex: 8.5,
    flexDirection: "row",
    borderRadius: 3,
    overflow: "hidden",
    height: 28,
  },
  backBtn: { marginRight: 15 },
  headerWrapper: {
    backgroundColor: "#960019",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  cartIcon: {
    color: "#ffffff",
  },
});

export default HeaderSearch;
