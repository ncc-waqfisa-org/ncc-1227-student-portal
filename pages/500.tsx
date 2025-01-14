import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom500() {
  const { push, locale } = useRouter();
  return (
    <div className="min-h-[100svh] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {locale === "ar" ? "حدث خطأ ما" : "Something went wrong"}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {locale === "ar"
            ? "حدث خطأ غير متوقع أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقاً"
            : "We encountered an unexpected issue while processing your request. Please try again later"}
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
