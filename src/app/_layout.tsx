import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShadowVisible: false,
            title: "SnapShop",
            headerTitleStyle: {
              color: colors.primary,
              fontWeight: "bold",
            },
            headerSearchBarOptions: {
              placeholder: "Search",
              hideWhenScrolling: false,
              hideNavigationBar: false,
            },
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
