import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const cartStorage = new MMKV({
  id: "cart-storage",
});

export const zustandStorage: StateStorage = {
  setItem: (name: string, value: any) => {
    return cartStorage.set(name, value);
  },
  getItem: (name: string) => {
    const value = cartStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    return cartStorage.delete(name);
  },
};
