import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import AuthProvider from "@/components/auth/AuthProvider";
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });
import ToasterContext from "@/components/ui/ToasterContext";

export const metadata = {
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
      <body className={openSans.className}>
        <ToasterContext />
        <AuthProvider>
          <Navbar>
            <main className="min-h-screen bg-grayLight">{children}</main>
          </Navbar>
        </AuthProvider>
      </body>
    </html>
  );
}
