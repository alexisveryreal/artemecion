import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full scroll-smooth bg-violet-50 antialiased" lang="en">
      <Head />
      <body className="h-full bg-violet-50 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
