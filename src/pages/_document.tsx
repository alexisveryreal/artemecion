import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full scroll-smooth bg-white antialiased" lang="en">
      <Head />
      <body className="h-full bg-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
