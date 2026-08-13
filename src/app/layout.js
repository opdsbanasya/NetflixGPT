import { Inter, Sora } from 'next/font/google';
import "./globals.css";
import ReduxProvider from "./ReduxProvider";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });

export const metadata = {
  title: "MovieGPT | AI Discovery",
  description: "AI-First movie discovery platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#050505] text-white">
        <ReduxProvider>
            {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
