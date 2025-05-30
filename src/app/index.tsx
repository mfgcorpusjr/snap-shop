import { StyleSheet, View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";

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
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
