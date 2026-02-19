"use client";

import { Provider } from "react-redux";
import { store } from "@/store/asselStore";
import { ThemeProvider } from "next-themes";
import InitStore from "./components/InitStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="light"
      enableSystem
      // disableTransitionOnChange
      // ? بتعطل اي ترانزيشن وبترجعو تاني بعد التغير في الtheme
    >
      <Provider store={store}>
        <InitStore>{children}</InitStore>
      </Provider>
    </ThemeProvider>
  );
}
