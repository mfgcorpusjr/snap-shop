import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import useCartStore from "@/store/useCartStore";

import { CartProduct } from "@/types";

import colors from "@/constants/colors";

type CartListItemProps = {
  product: CartProduct;
};

type LeftActionProps = {
  translation: SharedValue<number>;
  product: CartProduct;
};

const LeftAction: React.FC<LeftActionProps> = ({ translation, product }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translation.value - 80 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable
        style={styles.leftAction}
        onPress={() => removeFromCart(product)}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </Pressable>
    </Reanimated.View>
  );
};

export default function CartListItem({ product }: CartListItemProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const substractFromCart = useCartStore((state) => state.substractFromCart);

  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={40}
      renderLeftActions={(_, translation) => (
        <LeftAction translation={translation} product={product} />
      )}
    >
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
    </ReanimatedSwipeable>
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
  leftAction: {
    backgroundColor: "crimson",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 8,
  },
});
