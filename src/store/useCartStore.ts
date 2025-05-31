import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { zustandStorage } from "@/storage/cart";

import { Product, CartProduct } from "@/types";

const INITIAL_VALUE = {
  products: [],
  totalPrice: 0,
  count: 0,
};

type CartStore = {
  products: CartProduct[];
  totalPrice: number;
  count: number;
  addToCart: (product: Product) => void;
  substractFromCart: (product: Product) => void;
  clearCart: () => void;
};

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...INITIAL_VALUE,

      addToCart: (product: Product) => {
        set((state) => {
          const hasProduct = state.products.some((p) => p.id === product.id);
          const totalPrice = Number(
            (state.totalPrice + product.price).toFixed(2)
          );
          const count = state.count + 1;

          if (hasProduct) {
            const products = state.products.map((p) => {
              if (p.id === product.id) {
                return { ...p, quantity: p.quantity + 1 };
              }
              return p;
            });

            return {
              products,
              totalPrice,
              count,
            };
          } else {
            const products = [...state.products, { ...product, quantity: 1 }];

            return {
              products,
              totalPrice,
              count,
            };
          }
        });
      },
      substractFromCart: (product: Product) => {
        set((state) => {
          const products = state.products
            .map((p) => {
              if (p.id === product.id) {
                return { ...p, quantity: p.quantity - 1 };
              }
              return p;
            })
            .filter((p) => p.quantity > 0);

          const totalPrice = Number(
            (state.totalPrice - product.price).toFixed(2)
          );
          const count = state.count - 1;

          return {
            products,
            totalPrice,
            count,
          };
        });
      },
      clearCart: () => {
        set({ ...INITIAL_VALUE });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useCartStore;
