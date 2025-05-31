import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CartButton from "@/components/CartButton";

import colors from "@/constants/colors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTintColor: colors.primary,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "SnapShop",
              headerShadowVisible: false,
              headerSearchBarOptions: {
                placeholder: "Search",
                hideWhenScrolling: false,
                hideNavigationBar: false,
              },
              headerRight: () => <CartButton />,
            }}
          />
          <Stack.Screen
            name="products/[id]"
            options={{
              headerBackTitle: "Products",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
