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
import HeaderFiltered from "./HeaderFiltered";

const Filtered = ({ navigation, route }: any) => {
  const [products, setProducts] = React.useState([]);

  const { searchValue } = route.params;

  React.useEffect(() => {
    const page = 0;
    fetch(
      `${localhostAddress}/user/product/find?name=${searchValue}&page=${page}`,
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
      <HeaderFiltered navigation={navigation} backBtn={true} />

      <ScrollView
        contentContainerStyle={{ justifyContent: "center", padding: 10 }}
      >
        <FlatList
          contentContainerStyle={{
            gap: 7,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          scrollEnabled={false}
          data={products}
          renderItem={({ item }: any) => (
            <View
              style={{
                width: "49%",
                backgroundColor: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 7,
                gap: 10,
                paddingVertical: 20,
              }}
            >
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
              <View style={{ paddingHorizontal: 20, width: "100%" }}>
                <Text
                  style={{ height: 40, fontSize: 15 }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: "#960019",
                      fontWeight: "bold",
                    }}
                  >
                    {FormatCurrency(item.retail)}
                  </Text>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      flex: 1.5,
                      backgroundColor: "#c21807",
                      fontWeight: "bold",
                      color: "#ffffff",
                      maxWidth: 45,
                      textAlign: "center",
                      borderRadius: 3,
                      paddingVertical: 2,
                    }}
                  >
                    -25%
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#909090",
                    width: "100%",
                    height: 20,
                  }}
                  numberOfLines={2}
                >
                  {item.author.name}
                </Text>
              </View>
            </View>
          )}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item: any) => JSON.stringify(item.id)}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            padding: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#d9dddc",
              paddingVertical: 3,
              paddingHorizontal: 7,
              borderRadius: 3,
            }}
          >
            <IconF5
              name="angle-double-left"
              size={21}
              style={{ color: "#960019" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#d9dddc",
              paddingVertical: 3,
              paddingHorizontal: 7,
              borderRadius: 3,
            }}
          >
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  productInfo: {
    marginTop: 10,
  },
  cartBtn_Icon: { color: "#960019" },
  cartBtn: { marginRight: 10 },
  productPrice_Text: { fontWeight: "500", color: "#960019", fontSize: 15 },
  productPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productSoldNumber: { color: "#aaa7ad", fontSize: 13 },
  productTitle_Text: { fontSize: 15 },
  productTitle: { minHeight: 40 },
  productBtn_SubAd_Text: { color: "#ffffff", fontSize: 10 },
  productBtn_SubAd: {
    position: "absolute",
    minWidth: 50,
    maxWidth: 50,
    justifyContent: "center",
    alignItems: "center",
    top: 3,
    left: 3,
    borderRadius: 5,
    backgroundColor: "#c21807",
    padding: 3,
  },
  productBtn_Image: { width: 120, height: 150 },
  productBtn: {
    borderRadius: 10,
    overflow: "hidden",
  },
  productWrapper: { minWidth: 125, maxWidth: 125, marginRight: 15 },
  flatListWrapper: { marginTop: 15 },
  bannerItem_Text: { marginLeft: 10, fontWeight: "500" },
  bannerItem_Icon: { color: "#960019" },
  bannerItem: {
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    flexDirection: "row",
  },
  bannerWrapper: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: 55,
    elevation: 10,
  },
  sectionWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleHero: {
    fontWeight: "bold",
    fontSize: 17,
    textTransform: "uppercase",
  },
  viewAllBtn: {},
  viewAllTitle: {
    color: "#960019",
    fontWeight: "500",
    fontSize: 15,
  },
  flatList: {
    backgroundColor: "#ccc",
    paddingTop: 10,
    paddingBottom: 10,
  },

  categoryItem: {
    marginRight: 10,
  },
  categoryItemWrap: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryItemImage: {
    width: 120,
    height: 140,
  },
  categoryItemName: {
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Filtered;
