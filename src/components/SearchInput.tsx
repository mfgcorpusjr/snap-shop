import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SearchInput({ ...rest }: TextInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={24} color="grey" />
      <TextInput
        {...rest}
        style={styles.textInput}
        placeholder={rest.placeholder || "Search"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
});
