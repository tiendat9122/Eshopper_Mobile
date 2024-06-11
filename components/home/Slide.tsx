import * as React from "react";
import { Dimensions, View, StyleSheet, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { localhostAddress } from "@/config/config";

const Slide = ({ navigation }: any) => {
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [slide, setSlide] = React.useState([]);

  const width = Dimensions.get("window").width;

  React.useEffect(() => {
    fetch(`${localhostAddress}/user/home/carousel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setSlide(data);
        });
      }
    });
  }, []);

  return (
    <View style={styles.slideWrapper}>
      <Carousel
        width={width}
        height={width / 2}
        data={slide}
        autoPlay={false}
        pagingEnabled={pagingEnabled}
        scrollAnimationDuration={2000}
        renderItem={({ item }: any) => (
          <View style={styles.carouselItem}>
            <Image
              style={styles.carouselImg}
              source={{
                uri:
                  `${localhostAddress}/user/home/slide/download/` +
                  item.picture,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slideWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  carouselImg: {
    width: "100%",
    height: "100%",
  },
});

export default Slide;
