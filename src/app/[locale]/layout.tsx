import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import Providers from "./providers";
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });
import ToasterContext from "@/components/ui/ToasterContext";
import CourseSelection from "@/components/course/CourseSelection";
import { Course } from "@/types";
import { NextIntlClientProvider, IntlErrorCode, IntlError } from "next-intl";
import { notFound } from "next/navigation";

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

const getCourses = async () => {
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(
    `${protocol}://${process.env.VERCEL_URL}/api/courses/`
  );
  const data = await res.json();
  return data;
};

const getMessages = async (locale: string) => {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
};

function onError(error: IntlError) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.error(error);
  } else {
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);
  const courses: Course[] = await getCourses();

  return (
    <html lang={locale}>
      <body className={openSans.className}>
        <ToasterContext />
        <Providers>
          <CourseSelection courses={courses}>
            <NextIntlClientProvider
              locale={locale}
              messages={messages}
              onError={onError}
            >
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
