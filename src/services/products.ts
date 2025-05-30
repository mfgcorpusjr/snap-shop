const apiUrl = process.env.EXPO_PUBLIC_API_URL;

import { Product } from "@/types";

export const getCategories = async (): Promise<string[]> => {
  const response = await fetch(`${apiUrl}/products/categories`);
  const data = await response.json();
  return data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${apiUrl}/products`);
  const data = await response.json();
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${apiUrl}/products/${id}`);
  const data = await response.json();
  return data;
};
