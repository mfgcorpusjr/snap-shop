import { StyleSheet, View, ScrollView, Text, Share } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import Snackbar from "react-native-snackbar";

import ProductItemShimmer from "@/components/shimmers/ProductItemShimmer";
import ListEmpty from "@/components/ListEmpty";
import BottomButton from "@/components/BottomButton";

import useCartStore from "@/store/useCartStore";

import { getProduct } from "@/services/products";

import { upperCaseFirstLetter } from "@/utils/string";

import colors from "@/constants/colors";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(Number(id)),
  });

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (data) {
      addToCart(data);

      Snackbar.show({
        text: "Item added to your cart.",
        duration: Snackbar.LENGTH_SHORT,
      });

      router.back();
    }
  };

  const handleShare = async () => {
    const url = `snap-shop://products/${id}`;

    await Share.share({
      message: `Check out this product on SnapShop: ${url}`,
      url,
    });
  };

  if (isLoading) {
    return <ProductItemShimmer />;
  }

  if (!data) {
    return <ListEmpty text="No product found" />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: data.title,
          headerRight: () => (
            <Ionicons
              name="share-outline"
              size={24}
              color="black"
              onPress={handleShare}
            />
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.image}
          source={{ uri: data.image }}
          contentFit="contain"
        />
        <View style={styles.productInfoContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.price}>${data.price}</Text>
          <Text style={styles.category}>
            {upperCaseFirstLetter(data.category)}
          </Text>
          <Text style={styles.description}>{data.description}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color={colors.secondary} />
            <Text style={styles.rate}>{data.rating.rate}</Text>
            <Text style={styles.ratingCount}>
              ({data.rating.count} reviews)
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomButton
        text="Add to Cart"
        icon={<Ionicons name="cart" size={24} color="white" />}
        onPress={handleAddToCart}
      />
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
    aspectRatio: 1,
    backgroundColor: "whitesmoke",
  },
  productInfoContainer: {
    padding: 12,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  category: {
    fontSize: 16,
    color: "grey",
  },
  description: {
    fontSize: 16,
    lineHeight: 28,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rate: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 16,
    color: "grey",
    marginLeft: 8,
  },
});
