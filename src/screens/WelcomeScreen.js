import { StyleSheet, Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const rind1padding = useSharedValue(0);
  const rind2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    rind1padding.value = 0;
    rind2padding.value = 0;
    setTimeout(() => {
      rind1padding.value = withSpring(rind1padding.value + hp(4));
    }, 200);

    setTimeout(() => {
      rind2padding.value = withSpring(rind2padding.value + hp(5));
    }, 450);

    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  }, []);
  return (
    <View style={styles.rootContainer}>
      <StatusBar style={"light"} />

      {/* logo image and rings */}
      <Animated.View style={[styles.container, { padding: rind2padding }]}>
        <Animated.View style={[styles.container, { padding: rind1padding }]}>
          <Image
            style={styles.image}
            source={require("../../assets/images/welcome.png")}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punch line  */}
      <View style={styles.title}>
        <Text style={[styles.titleText, { fontSize: hp("7%") }]}>Foody</Text>
        <Text style={styles.titleText}>Food is always right.</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#ec9d0aff",
  },
  container: {
    backgroundColor: "#f7f1f151",
    borderRadius: 999,
  },

  image: {
    width: hp(25),
    height: hp(25),
  },
  title: {
    marginTop: 30,
    alignItems: "center",
  },
  titleText: {
    marginTop: hp(1),
    color: "white",
    fontSize: hp(2),
    fontWeight: "bold",
  },
});
