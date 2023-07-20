import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import Providers from "./providers";
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });
import ToasterContext from "@/components/ui/ToasterContext";
import CourseSelection from "@/components/course/CourseSelection";
import { Course } from "@/types";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const getCourses = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/courses/`);
  const data = await res.json();
  return data;
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  const courses: Course[] = await getCourses();

  return (
    <html lang="en">
      <body className={openSans.className}>
        <ToasterContext />
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <CourseSelection courses={courses}>
              <Navbar>
                <main className="min-h-screen bg-grayLight">{children}</main>
              </Navbar>
            </CourseSelection>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}