import * as React from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { localhostAddress } from "@/config/config";

const Categories = ({ navigation }: any) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch(`${localhostAddress}/user/category/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((categories) => {
          setCategories(categories);
        });
      }
    });
  }, []);

  return (
    <View style={styles.categoriesWrapper}>
      <FlatList
        scrollEnabled={true}
        data={categories}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        horizontal={true}
        keyExtractor={(item: any) => JSON.stringify(item.id)}
        renderItem={({ item }: any) => (
          <View style={styles.categoryItem}>
            <TouchableOpacity
              style={styles.categoryItemWrap}
              onPress={() =>
                navigation.navigate("ProductStack", { categoryId: item.id })
              }
            >
              <Image
                source={{
                  uri:
                    `${localhostAddress}/user/home/category/download/` +
                    item.picture,
                }}
                style={styles.categoryItemImage}
              />
            </TouchableOpacity>
            <Text style={styles.categoryItemName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  flatList: {},

  categoryItem: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: 80,
  },
  categoryItemWrap: {
    borderWidth: 5,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "#ccc",
  },
  categoryItemImage: {
    width: 50,
    height: 50,
  },
  categoryItemName: {
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Categories;
