import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404() {
  const { push, locale } = useRouter();
  return (
    <div className="min-h-[100svh] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full text-center">
        <p className="text-6xl font-semibold animate-pulse font-IBM py-10 text-primary">
          4 0 4
        </p>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {locale === "ar"
            ? "الصفحة التي تبحث عنها قد تكون انتقلت أو لم تعد موجودة"
            : "The page you are looking for might have moved or no longer exists."}
        </p>
        <Link
          href="/"
          className="inline-block bg-[#594E38] text-white font-semibold px-6 py-3 rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#594E38] focus:ring-opacity-50"
        >
          {locale === "ar" ? "العودة للرئيسية" : "Go Home"}
        </Link>
      </div>
    </div>
  );
}
