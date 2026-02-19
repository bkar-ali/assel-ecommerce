import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: {
    default: "Assel",
    template: "%s | Assel",
  },
  description: "E-commerce Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-primary duration-500">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

{
  /*

TODO - suppressHydrationWarning
? there is no interference in the system between Dark And Light 

*/
}
