import { StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { Product } from "@/types";

import colors from "@/constants/colors";

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Link href={`/products/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    height: 44,
  },
  price: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
