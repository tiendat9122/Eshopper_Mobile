import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import HeaderUser from "../user/HeaderUser";
import { localhostAddress } from "@/config/config";

const Category = ({ navigation }: any) => {
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
    <View style={{ flex: 1 }}>
      <HeaderUser title="Thể loại" />

      <ScrollView
        contentContainerStyle={{ backgroundColor: "#ffffff", flex: 1 }}
      >
        <View style={styles.categoryContainer}>
          <View style={styles.categoryGroup}>
            {categories.map((item: any) => (
              <TouchableOpacity
                style={styles.itemBtnGroup}
                key={item.id}
                onPress={() =>
                  navigation.navigate("ProductStack", { categoryId: item.id })
                }
              >
                <View style={styles.itemBtn_BottomLayer1}></View>
                <View style={styles.itemBtn_BottomLayer2}></View>
                <Image
                  source={{
                    uri:
                      `${localhostAddress}/user/home/category/download/` +
                      item.picture,
                  }}
                  style={styles.categoryItemImage}
                />

                <View style={styles.itemBtn_Title}>
                  <Text style={styles.itemBtn_TitleText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBtn_TitleText: {
    textAlign: "center",
    fontWeight: "400",
    color: "#ffffff",
  },
  itemBtn_Title: {
    width: "100%",
    height: 35,
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 90,
    paddingHorizontal: 10,
  },
  itemBtn_BottomLayer2: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0,0,0,0.1)",
    position: "absolute",
    top: 13,
    left: 13,
    zIndex: 0,
  },
  itemBtn_BottomLayer1: {
    width: "100%",
    height: 100,
    backgroundColor: "#ccc",
    position: "absolute",
    top: 7,
    left: 7,
    zIndex: 1,
  },
  itemBtnGroup: {
    width: "26%",
    height: 100,
    backgroundColor: "#ccc",
    elevation: 7,
    alignItems: "center",
  },
  categoryGroup: {
    margin: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 35,
    justifyContent: "space-between",
  },
  categoryContainer: {},
  categoryItemImage: {
    height: "100%",
    width: "100%",
    zIndex: 90,
  },
});

export default Category;
