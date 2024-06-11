import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

import { localhostAddress } from "@/config/config";
import FormatCurrency from "../common/FormatCurrency";

const Recommend = ({ navigation }: any) => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(`${localhostAddress}/user/home/trending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((productTrending) => {
          setProducts(productTrending);
        });
      }
    });
  }, []);

  return (
    <View style={styles.recommendWrapper}>
      <Text style={styles.recommendTitle}>Eshopper Giới thiệu</Text>
      <FlatList
        contentContainerStyle={styles.flatListWrapper}
        scrollEnabled={true}
        data={products}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        horizontal={true}
        keyExtractor={(item: any) => JSON.stringify(item.id)}
        renderItem={({ item }: any) => (
          <View style={styles.itemWrapper}>
            <TouchableOpacity
              style={styles.itemBtn}
              onPress={() =>
                navigation.push("DetailStack", { productId: item.id })
              }
            >
              <Image
                source={{
                  uri:
                    `${localhostAddress}/user/product/download/` + item.picture,
                }}
                style={styles.itemBtn_Img}
              />
              <View style={styles.infoGroup}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.itemName}
                >
                  {item.name}
                </Text>

                <View style={styles.itemPriceGroup}>
                  <Text style={styles.itemPriceText}>
                    {FormatCurrency(item.retail)}
                  </Text>
                  <View style={styles.itemPriceDiscount}>
                    <Text style={{ color: "#ffffff" }}>-20 </Text>
                    <IconF5
                      name="percent"
                      size={9}
                      style={{ color: "#ffffff" }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={{
          borderWidth: 1,
          paddingVertical: 5,
          paddingHorizontal: 20,
          borderRadius: 5,
          alignSelf: "center",
          borderColor: "#960019",
        }}
      >
        <Text style={{ fontWeight: "500", color: "#960019", fontSize: 15 }}>
          Xem thêm
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemPriceDiscount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#960019",
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  itemPriceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#960019",
  },
  itemPriceGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  itemName: { height: 40, fontSize: 15 },
  infoGroup: {},
  itemBtn_Img: { flex: 1, height: 140, resizeMode: "cover" },
  itemBtn: { width: 120, gap: 5 },
  itemWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  flatListWrapper: { gap: 10 },
  recommendTitle: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 17,
    borderBottomWidth: 2,
    borderColor: "#960019",
    width: 180,
    textAlign: "center",
    paddingVertical: 7,
    color: "#960019",
  },
  recommendWrapper: { gap: 10 },
});

export default Recommend;
