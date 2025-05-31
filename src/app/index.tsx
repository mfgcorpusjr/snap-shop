import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { useHeaderHeight } from "@react-navigation/elements";

import CategoryListItem from "@/components/CategoryListItem";
import ProductListItem from "@/components/ProductListItem";
import CategoryListShimmer from "@/components/shimmers/CategoryListShimmer";
import ProductListShimmer from "@/components/shimmers/ProductListShimmer";
import ListEmpty from "@/components/ListEmpty";

import { getCategories, getProducts } from "@/services/products";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const headerHeight = useHeaderHeight();

  const { isLoading: categoriesIsLoading, data: categoriesData = [] } =
    useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    });

  const {
    isLoading: productsIsLoading,
    data: productsData = [],
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const categories = ["all", ...categoriesData];

  const products = productsData.filter((product) => {
    const condition1 = product.title
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const condition2 = product.category === selectedCategory;

    return selectedCategory === "all" ? condition1 : condition1 && condition2;
  });

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => setSearch(e.nativeEvent.text),
          },
        }}
      />

      <View style={styles.categoriesContainer}>
        {categoriesIsLoading ? (
          <CategoryListShimmer />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContentContainer}
          >
            {categories.map((category) => (
              <CategoryListItem
                key={category}
                category={category}
                isSelected={category === selectedCategory}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </ScrollView>
        )}
      </View>

      {productsIsLoading ? (
        <ProductListShimmer />
      ) : (
        <FlashList
          data={products}
          renderItem={({ item }) => <ProductListItem product={item} />}
          ListEmptyComponent={<ListEmpty text="No products found" />}
          estimatedItemSize={200}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesContainer: {
    backgroundColor: "white",
    height: 60,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  categoriesContentContainer: {
    gap: 12,
    padding: 12,
  },
});
