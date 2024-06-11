import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { passLogin } from "@/redux/loginSlice";
import { selectLogin } from "@/redux/loginSlice";
import Authorize from "./Authorize";
import Unauthorize from "./Unauthorize";

const Authenticate = ({ navigation }: any) => {
  const auth = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("jwt");
        if (value !== null) {
          dispatch(passLogin(value));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <>
      {auth ? (
        <Authorize navigation={navigation} />
      ) : (
        <Unauthorize navigation={navigation} />
      )}
    </>
  );
};

export default Authenticate;
