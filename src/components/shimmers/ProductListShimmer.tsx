import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ProductListItemShimmer = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder style={styles.image} />
      <ShimmerPlaceholder style={styles.title1} />
      <ShimmerPlaceholder style={styles.title2} />
      <ShimmerPlaceholder style={styles.price} />
    </View>
  );
};

export default function ProductListShimmer() {
  return (
    <FlashList
      data={[...Array(6).keys()]}
      renderItem={() => <ProductListItemShimmer />}
      keyExtractor={(item) => item.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8,
    padding: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: 150,
  },
  title1: {
    width: "90%",
  },
  title2: {
    width: "60%",
  },
  price: {
    width: "30%",
  },
});
