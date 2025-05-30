import { StyleSheet, View, useWindowDimensions } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function ProductItemShimmer() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ShimmerPlaceholder style={{ width, height: width }} />

      <View style={styles.productInfoContainer}>
        <ShimmerPlaceholder style={styles.title} />
        <ShimmerPlaceholder style={styles.price} />
        <ShimmerPlaceholder style={styles.category} />
        <ShimmerPlaceholder style={styles.description1} />
        <ShimmerPlaceholder style={styles.description2} />
        <ShimmerPlaceholder style={styles.description3} />
        <ShimmerPlaceholder style={styles.rating} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
  },
  productInfoContainer: {
    padding: 12,
    gap: 12,
  },
  title: {
    width: "50%",
    height: 40,
  },
  price: {
    width: "20%",
    height: 32,
  },
  category: {
    width: "30%",
    height: 28,
  },
  description1: {
    width: "100%",
    height: 28,
  },
  description2: {
    width: "90%",
    height: 28,
  },
  description3: {
    width: "80%",
    height: 28,
  },
  rating: {
    width: "30%",
    height: 28,
  },
});
