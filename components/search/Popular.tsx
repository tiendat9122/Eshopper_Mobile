import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";
import IconF6 from "@expo/vector-icons/FontAwesome6";

import { localhostAddress } from "@/config/config";
import FormatCurrency from "../common/FormatCurrency";

const Popular = ({ navigation }: any) => {
  const [popularList, setPopularList] = React.useState([]);

  React.useEffect(() => {
    fetch(`${localhostAddress}/user/home/trending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((productTrending) => {
          setPopularList(productTrending);
        });
      }
    });
  }, []);

  return (
    <View style={styles.popularWrapper}>
      <View style={styles.titleGroup}>
        <IconF6 name="arrow-trend-up" size={17} />
        <Text style={styles.titleText}>Tìm kiếm phổ biến</Text>
      </View>
      <View style={styles.listProductGroup}>
        {popularList.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            style={styles.productBtn}
            onPress={() =>
              navigation.navigate("DetailStack", { productId: item.id })
            }
          >
            <Image
              source={{
                uri:
                  `${localhostAddress}/user/product/download/` + item.picture,
              }}
              style={styles.productBtn_Image}
            />
            <Text style={styles.productBtn_Text} numberOfLines={3}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popularWrapper: {
    marginTop: 10,
    gap: 5,
  },
  titleText: { fontSize: 17, fontWeight: "bold" },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  listProductGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
  },
  productBtn_Text: { flex: 1 },
  productBtn: {
    width: "48%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  productBtn_Image: { width: 60, height: 60 },
});

export default Popular;
