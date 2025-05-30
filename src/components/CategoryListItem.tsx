import { StyleSheet, Pressable, Text } from "react-native";

import { upperCaseFirstLetter } from "@/utils/string";

import colors from "@/constants/colors";

type CategoryListItem = {
  category: string;
  isSelected?: boolean;
  onPress: () => void;
};

export default function CategoryListItem({
  category,
  isSelected,
  onPress,
}: CategoryListItem) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {upperCaseFirstLetter(category)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
  },
  text: {
    color: "grey",
    fontWeight: "500",
  },
  selectedText: {
    color: "white",
  },
});
