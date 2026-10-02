"use client";

import { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { login } from "../slices/authSlice";
import { getAccessToken } from "@/lib/token.service";

function AuthBoot() {
  const dispatch = useDispatch();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const token = getAccessToken();
    if (token) dispatch(login({ token: token, username: "" }));
  }, [dispatch]);

  return null;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthBoot />
      {children}
    </Provider>
  );
}
