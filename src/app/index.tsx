import { StyleSheet, View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";

import ProductListItem from "@/components/ProductListItem";

import { getCategories, getProducts } from "@/services/products";

export default function HomeScreen() {
  const { isLoading: categoriesIsLoading, data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { isLoading: productsIsLoading, data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <View style={styles.container}>
      <FlashList
        data={productsData}
        renderItem={({ item }) => <ProductListItem product={item} />}
        estimatedItemSize={200}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
