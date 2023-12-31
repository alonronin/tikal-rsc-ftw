import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="p-4 shadow-md">
          <ul className="container mx-auto flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
          </ul>
        </nav>
        <div className="container mx-auto py-4 flex flex-col gap-4">
          {children}
        </div>
      </body>
    </html>
  );
}
