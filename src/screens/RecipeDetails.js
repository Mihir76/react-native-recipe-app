import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UserGroupIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Loading from "../components/Loading";

const RecipeDetails = (props) => {
  let item = props.route.params;
  //   console.log(item.strMealThumb);
  let mealItem = item.idMeal;
  const [myMeal, setMyMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRecipeDetail = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem}`
      );

      if (response && response.data) {
        // console.log(response.data.meals[0]);
        setMyMeal(response.data.meals[0]);
        // console.log(myMeal);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipeDetail();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* recipe image  */}
      <Animated.View
        style={styles.imageContainer}
        entering={FadeInUp.delay(200).duration(700).springify()}
      >
        <Image
          resizeMode="cover"
          source={{ uri: item.strMealThumb }}
          style={{
            width: hp(64),
            height: hp(50),
            borderRadius: 35,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        />
      </Animated.View>

      {/* back button  */}
      {/* <View style={{}}> */}
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{
          backgroundColor: "white",
          borderRadius: 999,
          alignItems: "center",
          position: "absolute",
          left: 5,
          top: 35,
        }}
      >
        <ChevronLeftIcon size={hp(4)} color={"red"} />
      </TouchableOpacity>
      {/* </View> */}

      <View style={{ marginTop: 20, marginHorizontal: 15 }}>
        {isLoading ? (
          <Loading size="large" color="red" />
        ) : (
          <View>
            {/* meal name */}
            <View>
              <Text style={styles.mealName}>{myMeal?.strMeal}</Text>
              <Text
                style={[styles.mealName, { fontSize: hp(2), marginTop: 3 }]}
              >
                {myMeal?.strArea}
              </Text>
            </View>

            {/* misc  */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
              }}
            >
              {/* time */}
              <View
                style={{
                  backgroundColor: "#f7b723f7",
                  padding: 6,
                  borderRadius: 35,
                  alignItems: "center",
                  marginVertical: 2,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    borderRadius: 999,
                    backgroundColor: "white",
                    padding: 6,
                  }}
                >
                  <ClockIcon size={30} color={"#141212"} />
                </View>
                <Text style={{ marginVertical: 3 }}>35</Text>
                <Text style={{ paddingBottom: 2 }}>Mins.</Text>
              </View>

              {/* servings */}
              <View
                style={{
                  backgroundColor: "#f7b723f7",
                  padding: 6,
                  borderRadius: 35,
                  alignItems: "center",
                  marginVertical: 2,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    borderRadius: 999,
                    backgroundColor: "white",
                    padding: 6,
                  }}
                >
                  <UserGroupIcon size={30} color={"#141212"} />
                </View>
                <Text style={{ marginVertical: 3 }}>03</Text>
                <Text style={{ paddingBottom: 2 }}>Serv</Text>
              </View>

              {/* cal */}
              <View
                style={{
                  backgroundColor: "#f7b723f7",
                  padding: 6,
                  borderRadius: 35,
                  alignItems: "center",
                  marginVertical: 2,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    borderRadius: 999,
                    backgroundColor: "white",
                    padding: 6,
                  }}
                >
                  <FireIcon size={30} color={"#141212"} />
                </View>
                <Text style={{ marginVertical: 3 }}>103</Text>
                <Text style={{ paddingBottom: 2 }}>cal</Text>
              </View>

              {/* easy */}
              <View
                style={{
                  backgroundColor: "#f7b723f7",
                  padding: 6,
                  borderRadius: 35,
                  alignItems: "center",
                  marginVertical: 2,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    borderRadius: 999,
                    backgroundColor: "white",
                    padding: 6,
                  }}
                >
                  <Square3Stack3DIcon size={30} color={"#141212"} />
                </View>
                <Text style={{ marginVertical: 3 }}></Text>
                <Text style={{ paddingBottom: 2 }}>Easy</Text>
              </View>
            </View>

            {/* ingredients */}
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: hp(3), color: "#211f1fd9" }}>
                Ingredients
              </Text>
              <View style={{ alignItems: "flex-start" }}>
                {/* list of ingredient  */}
                <Text style={styles.ingredientItems}>first hb</Text>
                <Text style={styles.ingredientItems}>second</Text>
                <Text style={styles.ingredientItems}>third</Text>
              </View>
            </View>

            {/* instructions */}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    // paddingHorizontal: 4,
    // marginTop: 4,
  },
  mealName: {
    fontSize: hp(3),
    fontWeight: "400",
    color: "#343030d5",
  },
  ingredientItems: {
    backgroundColor: "#80808088",
    padding: 8,
    borderRadius: 25,
    marginVertical: 2,
  },
});
