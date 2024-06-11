import * as React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

const HeaderUser = ({ title, navigation, backButton }: any) => {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#960019"
        hidden={false}
        barStyle="light-content"
      />

      <View
        style={{
          backgroundColor: "#960019",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          flexDirection: "row",
        }}
      >
        {backButton ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 10,
              paddingRight: 20,
              paddingLeft: 5,
              paddingBottom: 5,
              paddingTop: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={17} style={{ color: "#ffffff" }} />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <Text
          style={{
            color: "#fff",
            fontSize: 19,
            fontWeight: 600,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderUser;
