// src/services/api.ts
// All API call logic lives here — completely separated from components.
// Components import these functions, never fetch directly.
//
// Both endpoints support pagination via skip/limit params,
// which is how we implement infinite scroll in the dropdowns.

import type { ProductsApiResponse, UsersApiResponse } from '@/types';

const BASE_URL = 'https://dummyjson.com';
const PAGE_SIZE = 10; // items per page for infinite scroll

// ─── Products API (Step 2 – Experience Level dropdown) ────────────────────────

export async function fetchProducts(page: number): Promise<ProductsApiResponse> {
  const skip = page * PAGE_SIZE;
  const res = await fetch(
    `${BASE_URL}/products?limit=${PAGE_SIZE}&skip=${skip}&select=id,title,category,price,thumbnail`,
  );
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json() as Promise<ProductsApiResponse>;
}

// ─── Users API (Step 3 – Preferred Departments dropdown) ─────────────────────

export async function fetchUsers(page: number): Promise<UsersApiResponse> {
  const skip = page * PAGE_SIZE;
  const res = await fetch(
    `${BASE_URL}/users?limit=${PAGE_SIZE}&skip=${skip}&select=id,firstName,lastName,email,image,company`,
  );
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  return res.json() as Promise<UsersApiResponse>;
}
