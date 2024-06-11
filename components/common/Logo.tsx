import * as React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

const LogoE = () => {
  return (
    <View style={styles.logogroup}>
      <Icon name="etsy" size={30} style={styles.logoIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  logogroup: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    borderColor: "#960019",
  },
  logoIcon: {
    color: "#960019",
  },
});

export default LogoE;
