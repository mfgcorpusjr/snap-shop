import { Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";

import CartButton from "@/components/CartButton";

import colors from "@/constants/colors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

Sentry.init({
  dsn: "https://06b8fcad35e0da0f665f0b4c2706a013@o4509421419495424.ingest.us.sentry.io/4509421430702086",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

function RootLayout() {
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

export default Sentry.wrap(RootLayout);
