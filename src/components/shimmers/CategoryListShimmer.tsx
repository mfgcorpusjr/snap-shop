import { StyleSheet, ScrollView } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function CategoryListShimmer() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesContentContainer}
    >
      {[...Array(5).keys()].map((index) => {
        return <ShimmerPlaceholder key={index} style={styles.category} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoriesContentContainer: {
    gap: 12,
    padding: 12,
  },
  category: {
    width: 100,
    height: 36,
    borderRadius: 100,
  },
});
