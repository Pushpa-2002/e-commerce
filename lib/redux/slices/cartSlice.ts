// lib/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
  data: CartItem[];
}

const initialState: CartState = {
  data: [],
};
const STORAGE_KEY = "cart:items";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { }
}
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: loadCart(),
  } as CartState,
  reducers: {
    addItem(state, action: PayloadAction<{ id: number; name: string; price: number }>) {
      const { id, name, price } = action.payload;
      const existing = state.data.find((i) => i.id === id);
      if (existing) existing.quantity += 1;
      else state.data.push({ id, name, quantity: 1, price });
      saveCart(state.data);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.data = state.data.filter((i) => i.id !== action.payload);
      saveCart(state.data);
    },

    setQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      const item = state.data.find((i) => i.id === id);
      if (!item) return;
      if (quantity <= 0) {
        state.data = state.data.filter((i) => i.id !== id);
      } else {
        item.quantity = quantity;
      }
      saveCart(state.data);
    },

    clearCart(state) {
      state.data = [];
      saveCart(state.data);
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice;