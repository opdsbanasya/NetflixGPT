import "./globals.css";
import ReduxProvider from "./ReduxProvider";

export const metadata = {
  title: "NetflixGPT",
  description: "Netflix clone with GPT search",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <ReduxProvider>
            {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
