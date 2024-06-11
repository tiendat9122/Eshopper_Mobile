import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

import HeaderDetail from "../detail/HeaderDetail";
import { localhostAddress } from "@/config/config";
import FormatCurrency from "../common/FormatCurrency";

const Product = ({ navigation, route }: any) => {
  const { categoryId } = route.params;

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const name = "";
    const page = 0;
    fetch(
      `${localhostAddress}/user/product/findbycate?categoryId=${categoryId}&name=${name}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((productData) => {
          setProducts(productData.content);
        });
      }
    });
  }, []);

  return (
    <>
      <HeaderDetail navigation={navigation} backBtn={true} />

      <ScrollView
        contentContainerStyle={{ justifyContent: "center", padding: 10 }}
      >
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.flatListColumn}
          scrollEnabled={false}
          data={products}
          renderItem={({ item }: any) => (
            <View style={styles.productWrapper}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailStack", { productId: item.id })
                }
              >
                <Image
                  source={{
                    uri:
                      `${localhostAddress}/user/product/download/` +
                      item.picture,
                  }}
                  style={styles.productBtn_Image}
                />
              </TouchableOpacity>
              <View style={styles.infoGroup}>
                <Text
                  style={styles.infoName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <View style={styles.priceGroup}>
                  <Text style={styles.priceText}>
                    {FormatCurrency(item.retail)}
                  </Text>
                  <Text style={styles.priceDiscount}>-25%</Text>
                </View>
                <Text style={styles.infoAuthor} numberOfLines={2}>
                  {item.author.name}
                </Text>
              </View>
            </View>
          )}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item: any) => JSON.stringify(item.id)}
        />

        <View style={styles.pagingGroup}>
          <TouchableOpacity style={styles.pagingBtn}>
            <IconF5
              name="angle-double-left"
              size={21}
              style={{ color: "#960019" }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pagingBtn}>
            <IconF5
              name="angle-double-right"
              size={21}
              style={{ color: "#960019" }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  pagingBtn: {
    backgroundColor: "#d9dddc",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 3,
  },
  pagingGroup: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
  },
  infoAuthor: {
    color: "#909090",
    width: "100%",
    height: 20,
  },
  priceDiscount: {
    alignSelf: "flex-start",
    flex: 1.5,
    backgroundColor: "#c21807",
    fontWeight: "bold",
    color: "#ffffff",
    maxWidth: 45,
    textAlign: "center",
    borderRadius: 3,
    paddingVertical: 2,
  },
  priceText: {
    flex: 1,
    fontSize: 16,
    color: "#960019",
    fontWeight: "bold",
  },
  priceGroup: { flexDirection: "row" },
  infoName: { height: 40, fontSize: 15 },
  infoGroup: { paddingHorizontal: 20, width: "100%" },
  productWrapper: {
    width: "49%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    gap: 10,
    paddingVertical: 20,
  },
  flatListColumn: {
    justifyContent: "space-between",
  },
  flatListContainer: {
    gap: 7,
  },
  productBtn_Image: { width: 120, height: 150 },
});
export default Product;
