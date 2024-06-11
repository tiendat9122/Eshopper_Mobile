import * as React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";
import IconF6 from "@expo/vector-icons/FontAwesome6";

import HeaderSearch from "./HeaderSearch";
import History from "./History";
import Popular from "./Popular";

const Search = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderSearch navigation={navigation} backBtn={true} />
      <ScrollView
        contentContainerStyle={{ backgroundColor: "#ffffff", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ margin: 10 }}>
          <History />
          <Popular navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
