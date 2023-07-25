import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import Providers from "./providers";
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });
import ToasterContext from "@/components/ui/ToasterContext";
import CourseSelection from "@/components/course/CourseSelection";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import getCourses from "../actions/getCourses";

export async function generateStaticParams() {
  return ["en", "es"].map((locale) => ({ locale }));
}

export const metadata = {
  title: "IdiomaMax",
  description: "Improve your English or Spanish",
  icons: {
    icon: "/im-logo.svg",
  },
};

const getMessages = async (locale: string) => {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);
  const courses = await getCourses();

  return (
    <html lang={locale}>
      <body className={openSans.className}>
        <ToasterContext />
        <Providers>
          <CourseSelection courses={courses} locale={locale}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Navbar>
                <main>{children}</main>
              </Navbar>
            </NextIntlClientProvider>
          </CourseSelection>
        </Providers>
      </body>
    </html>
  );
}
