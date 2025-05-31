import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import CartListItem from "@/components/CartListItem";
import BottomButton from "@/components/BottomButton";
import ListEmpty from "@/components/ListEmpty";

import useCartStore from "@/store/useCartStore";

import colors from "@/constants/colors";

export default function CartScreen() {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const products = useCartStore((state) => state.products);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleCheckout = () => {
    Alert.alert("Your order has been placed.", "", [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          router.dismiss();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalLabel}>
        Total: <Text style={styles.total}>${totalPrice}</Text>
      </Text>

      <FlatList
        data={products}
        renderItem={({ item }) => <CartListItem product={item} />}
        contentContainerStyle={styles.cartProductsContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmpty text="No products found" />}
      />

      <BottomButton
        text="Checkout"
        icon={<Ionicons name="checkmark" size={24} color="white" />}
        isDisabled={products.length === 0}
        onPress={handleCheckout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  totalLabel: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 28,
  },
  total: {
    color: colors.primary,
  },
  cartProductsContainer: {
    gap: 20,
    paddingHorizontal: 12,
  },
});
