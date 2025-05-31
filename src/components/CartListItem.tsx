import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

import useCartStore from "@/store/useCartStore";

import { CartProduct } from "@/types";

import colors from "@/constants/colors";

type CartListItemProps = {
  product: CartProduct;
};

export default function CartListItem({ product }: CartListItemProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const substractFromCart = useCartStore((state) => state.substractFromCart);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image }} />

      <View style={styles.productInfoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.priceLabel}>
          Price: <Text style={styles.price}>${product.price}</Text>
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Ionicons
          name="remove"
          size={24}
          color="black"
          onPress={() => substractFromCart(product)}
        />
        <Text style={styles.quantity}>{product.quantity}</Text>
        <Ionicons
          name="add"
          size={24}
          color="black"
          onPress={() => addToCart(product)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  productInfoContainer: {
    flex: 1,
    gap: 4,
  },
  image: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  priceLabel: {
    color: "grey",
  },
  price: {
    color: colors.primary,
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
  },
});
