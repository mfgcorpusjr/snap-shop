import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "@/constants/colors";

type BottomButtonProps = {
  text: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  onPress: () => void;
};

export default function BottomButton({
  text,
  icon,
  isDisabled,
  onPress,
}: BottomButtonProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isDisabled && styles.disabledContainer,
        { paddingBottom: bottom },
      ]}
      disabled={isDisabled}
      onPress={onPress}
    >
      {icon}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
  disabledContainer: {
    backgroundColor: "grey",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
