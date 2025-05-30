import { StyleSheet, View, Text } from "react-native";

type ListEmptyProps = {
  text?: string;
};

export default function ListEmpty({ text = "No data found" }: ListEmptyProps) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
});
