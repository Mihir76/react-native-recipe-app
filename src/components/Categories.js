import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

const Categories = ({ categories, activeCategory, handlerChangeCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(400).springify()}>
      <ScrollView
        style={styles.mainContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {categories.map((dataItem) => {
          let isActive = dataItem.strCategory === activeCategory;

          return (
            <TouchableOpacity
              onPress={() => {
                handlerChangeCategory(dataItem.strCategory);
                // console.log(activeCategory);
              }}
              style={[
                styles.categoriesContainer,
                isActive ? { backgroundColor: "#362d2d27" } : {},
              ]}
              key={dataItem.idCategory}
            >
              <Image
                style={styles.image}
                source={{ uri: dataItem.strCategoryThumb }}
              />
              <Text
                style={{
                  fontSize: hp(1.7),
                  color: "#454242",
                  marginBottom: 3,
                  marginHorizontal: 2,
                }}
              >
                {dataItem.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 20,
  },
  categoriesContainer: {
    borderRadius: 25,
    paddingHorizontal: 8,
    alignItems: "center",
    marginHorizontal: 3,
  },
  image: {
    width: hp(6),
    height: hp(6),
    resizeMode: "contain",
  },
});
