import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import {} from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";

const Recipes = ({ recipes, categories }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Recipes</Text>

      <View>
        {recipes.length === 0 ? (
          <Loading size="large" color="#969090c3" />
        ) : (
          <MasonryList
            data={recipes}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
              <RecipeCard item={item.item} index={item.i} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginTop: 5,
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#343030d5",
  },
});

const RecipeCard = ({ item, index }) => {
  const navigation = useNavigation();

  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 600)
        .springify()
        .damping()}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RecipeDetails", { ...item });
        }}
        style={{
          paddingRight: isEven ? 8 : 0,
          justifyContent: "center",
          marginTop: 10,
        }}
        key={index}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: item.strMealThumb }}
            style={{
              width: "100%",
              height: index % 3 === 0 ? hp(25) : hp(35),
              borderRadius: 35,
            }}
          />
          <Text
            style={{
              fontSize: hp(2),
              color: "#231a1ad4",
              textAlign: "center",
            }}
          >
            {item.strMeal}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
