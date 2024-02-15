import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Animated, { FadeInUp } from "react-native-reanimated";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  function handlerChangeCategory(newCategory) {
    getRecipes(newCategory);
    setActiveCategory(newCategory);
    setActiveCategory(newCategory);
    setRecipes([]);
  }

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      if (response && response.data) {
        // console.log(response.data);
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response && response.data) {
        // console.log(response.data);
        setRecipes(response.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.rootContainer}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* avatar */}
        <Animated.View
          entering={FadeInUp.duration(800)}
          style={styles.headerContainer}
        >
          <Image
            style={styles.image}
            source={require("../../assets/images/avatar.png")}
          />
          <BellIcon size={hp(4)} color={"grey"} />
        </Animated.View>

        {/* greeting and punch-lines */}
        <Animated.View
          entering={FadeInUp.duration(400)}
          style={styles.greetingContainer}
        >
          <Text style={styles.nameText}>Hello, Mihir!</Text>
          <Text style={styles.punchLineText}>Make Your own food,</Text>
          <Text style={[styles.punchLineText, { fontSize: hp(3.5) }]}>
            stay <Text style={{ color: "#d2cf28" }}>healthy</Text>
          </Text>
        </Animated.View>
        {/* search bar  */}
        <Animated.View
          entering={FadeInUp.duration(200)}
          style={styles.searchBarContainer}
        >
          <TextInput
            style={{
              paddingLeft: 15,
              paddingVertical: 7,
              color: "#483f3fff",
              fontSize: hp(1.7),
            }}
            placeholder="Search any recipe"
            placeholderTextColor={"grey"}
          />
          <View style={styles.searchIconContainer}>
            <MagnifyingGlassIcon size={hp(2.5)} color={"grey"} />
          </View>
        </Animated.View>
        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handlerChangeCategory={handlerChangeCategory}
            />
          )}
        </View>

        {/* recipes  */}
        <Recipes recipes={recipes} category={categories} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  container: {
    marginHorizontal: 10,
  },
  image: {
    width: hp(5.5),
    height: hp(5),
  },
  headerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    flexDirection: "row",
  },
  greetingContainer: {
    marginTop: 18,
  },
  nameText: {
    fontSize: hp(2),
    color: "#2b252591",
  },
  punchLineText: {
    fontSize: hp(4),
    color: "#3b3939d4",
    fontWeight: "800",
  },
  searchBarContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#d7cfcf3e",
    borderRadius: 20,
    borderColor: "#d7cfcf3e",
    borderWidth: 1,
  },
  searchIconContainer: {
    backgroundColor: "white",
    borderRadius: 999,
    padding: 7,
    alignSelf: "center",
    marginRight: 3,
  },
});
