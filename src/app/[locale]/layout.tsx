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
  title: "IdiomaMax",
  description: "Improve your English or Spanish",
  icons: {
    icon: "/im-logo.svg",
  },
};

const getCourses = async () => {
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(
    `${protocol}://${process.env.VERCEL_URL}/api/courses/`
  );
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
    console.log(locale, messages);
  } catch (error) {
    notFound();
  }
  const courses: Course[] = await getCourses();

  return (
    <html lang={locale}>
      <body className={openSans.className}>
        <ToasterContext />
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <CourseSelection courses={courses}>
              <Navbar>
                <main>{children}</main>
              </Navbar>
            </CourseSelection>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
