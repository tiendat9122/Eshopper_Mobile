import * as React from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";

import HeaderDetail from "./HeaderDetail";
import { localhostAddress } from "@/config/config";
import Recommend from "./Recommend";
import Info from "./Info";
import AddCart from "./AddCart";

interface Author {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  picture: string;
  totalProduct: number;
}

interface Product {
  id: 0;
  name: string;
  retail: 0;
  categories: Category[];
  author: Author;
  picture: string;
  inventory: number;
  hot: boolean;
  active: boolean;
  summary: string;
}

const Detail = ({ navigation, route }: any) => {
  const { productId } = route.params;

  const [product, setProduct] = React.useState<Product>({
    id: 0,
    name: "",
    retail: 0,
    author: {
      id: 0,
      name: "",
    },
    categories: [
      {
        id: 0,
        name: "",
        picture: "",
        totalProduct: 0,
      },
    ],
    summary: "",
    picture: "",
    inventory: 0,
    hot: false,
    active: false,
  });

  React.useEffect(() => {
    fetch(`${localhostAddress}/user/product/get?id=${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((productInfo) => {
          setProduct(productInfo);
        });
      }
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <HeaderDetail navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollViewWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ margin: 10, gap: 15 }}>
          <Info navigation={navigation} product={product} />

          <Recommend navigation={navigation} />
        </View>
      </ScrollView>
      <AddCart productId={productId} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    backgroundColor: "#ffffff",
    margin: 10,
    paddingBottom: 90,
  },
});

export default Detail;
