import * as React from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderHome from "./HeaderHome";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { passLogin } from "@/redux/loginSlice";
import Slide from "./Slide";
import Categories from "./Categories";
import BestSeller from "./BestSeller";
import Advertise from "./Advertise";
import Trending from "./Trending";

import { selectUser } from "@/redux/userSlice";
import { selectLogin } from "@/redux/loginSlice";
import { setUser } from "@/redux/userSlice";
const Home = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    const _retrieveData = async () => {
      try {
        const userTokenJson = await AsyncStorage.getItem("user");
        const jwtTokenJson = await AsyncStorage.getItem("jwt");
        if (userTokenJson !== null && jwtTokenJson !== null) {
          const userObject = JSON.parse(userTokenJson);
          dispatch(setUser(userObject));
          dispatch(passLogin(jwtTokenJson));
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
  }, []);

  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <HeaderHome navigation={navigation} backBtn={false} />

      <ScrollView
        contentContainerStyle={{ backgroundColor: "#ffffff", margin: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Categories navigation={navigation} />

        <Slide />

        <BestSeller navigation={navigation} user={user} />

        <Trending navigation={navigation} user={user} />

        <Advertise />
      </ScrollView>
    </View>
  );
};

export default Home;
