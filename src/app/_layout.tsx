import { Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <GestureHandlerRootView>
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
                headerRight: () => <CartButton />,
              }}
            />
            <Stack.Screen
              name="products/[id]"
              options={{
                headerBackTitle: "Products",
              }}
            />
            <Stack.Screen
              name="cart"
              options={{
                title: "Cart",
                presentation: "modal",
                headerLeft: () => (
                  <Ionicons
                    name="close"
                    size={24}
                    color="black"
                    onPress={() => router.dismiss()}
                  />
                ),
              }}
            />
          </Stack>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
