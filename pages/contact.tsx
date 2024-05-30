import React from "react";
import { PageComponent } from "../components/PageComponent";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordion";
import { cn } from "../src/lib/utils";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "toast",
        "footer",
        "pageTitles",
        "signIn",
        "contacts",
        "errors",
      ])),
    },
  };
};

const englishFaqs = [
  {
    question:
      "What is the scholarship plan and the specializations included in the Isa bin Salman Charity Educational Scholarship?",
    answer:
      "You can review the available study programs for the academic year 2024-2025 after completing the registration process on the platform and submitting the scholarship application.",
  },
  {
    question:
      "Can I apply for a scholarship through the platform if I have not yet received acceptance letters from the universities I applied to?",
    answer:
      "You can apply for the scholarship through the platform during the specified registration period and update your information when you receive acceptance letters from any universities you applied to. The platform allows updating the application with attachments after the registration period ends.",
  },
  {
    question:
      "I am not sure if I qualify for a scholarship from the foundation. How can I check the required criteria?",
    answer:
      "You can check the criteria by reviewing the 'Application Acceptance Criteria and Registration Conditions' through the foundation's social media accounts and the website www.waqfisa.bh.",
  },
  {
    question:
      "When registering, I am asked to provide proof of family income. What document should I upload?",
    answer:
      "You can upload a salary certificate from the employer, and for retired guardians, you can upload a salary certificate from the General Authority for Social Insurance.",
  },
  {
    question:
      "I completed the registration process on the platform, but when I applied for a scholarship, I couldn't find any of the universities I want to study at.",
    answer:
      "The scholarships for the academic year 2024-2025 are only for the universities listed on the platform. You can review them after registering on the website and accessing the application platform. It is not possible to apply for universities not listed in the scholarship plan.",
  },
  {
    question:
      "When applying for the scholarship, I am asked to submit my academic certificates and transcripts. What documents are required in this case?",
    answer:
      "The original graduation certificate and transcripts in Arabic or English, stamped by the school or the Ministry of Education, are accepted. For private schools, the certificate issued by the Private Schools Licensing Administration of the Ministry of Education should be uploaded.",
  },
  {
    question:
      "I tried clicking the submit button, but the submission did not succeed.",
    answer:
      "Please make sure all required information is entered. If you encounter any other issues, please send an email to info@waqfisa.bh.",
  },
  {
    question:
      "How can I confirm that my application has been successfully submitted?",
    answer:
      "An email will be sent to you to confirm receipt of your application.",
  },
];

const arabicFaqs = [
  {
    question:
      "ما هي خطة البعثات والتخصصات التي تشملها بعثات وقف عيسى بن سلمان التعليمي الخيري؟",
    answer:
      "بإمكانكم الاطلاع على البرامج الدراسية المتوفرة للعام الأكاديمي 2024-2025 بعد إتمام عملية التسجيل في المنصة وتقديم الطلب لبعثة دراسية.",
  },
  {
    question:
      "هل بإمكاني تقديم طلب بعثة دراسية عبر المنصة ولم أحصل حتى الآن على رسائل القبول من الجامعات المقدم لها؟",
    answer:
      "بإمكانكم التقدم بطلب للحصول على البعثة الدراسية عبر المنصة خلال المدة الزمنية المحددة للتسجيل، وتحديث البيانات عند الحصول على رسائل القبول من أية جامعات تم التقديم لها عند استلامها، حيث تسمح المنصة بتحديث الطلب بالمرفقات بعد انتهاء مدة التسجيل.",
  },
  {
    question:
      "غير متأكد إن كنت مستحقًا لبعثة دراسية من الوقف، كيف بإمكاني التحقق من المعايير المطلوبة؟",
    answer:
      "يمكنكم التأكد من المعايير عبر الاطلاع على 'معايير قبول الطلب، وشروط التسجيل' من خلال حساب الوقف في وسائل التواصل الاجتماعي والموقع الإلكتروني www.waqfisa.bh.",
  },
  {
    question:
      "عند التسجيل يتم سؤالي عن إثبات دخل الأسرة، ما هو المستند الذي أقوم برفعه؟",
    answer:
      "بإمكانكم رفع شهادة الراتب المقدمة من جهة العمل، ولأولياء الأمور المتقاعدين بإمكانكم رفع شهادة الراتب المقدمة من الهيئة العامة للتأمين الاجتماعي.",
  },
  {
    question:
      "قمت بإتمام عملية التسجيل في المنصة وعند تقديم الطلب لبعثة دراسية لم أحصل على أحد الجامعات التي أرغب بالدراسة فيها.",
    answer:
      "البعثات الدراسية للعام الأكاديمي 2024-2025 هي للجامعات المدرجة على المنصة فقط، ويمكنكم الاطلاع عليها بعد التسجيل عبر الموقع ودخول منصة التقديم، ولا يمكن التقديم لجامعات أخرى غير مدرجة في خطة البعثات.",
  },
  {
    question:
      "عند تقديم الطلب للبعثة الدراسية يُطلب مني تقديم شهادتي الدراسية وكشف الدرجات، ما هي المستندات المطلوبة في هذه الحالة؟",
    answer:
      "تُقبل إفادة التخرج وكشف الدرجات الأصليين باللغة العربية أو اللغة الإنجليزية المختومين من المدرسة أو من وزارة التربية والتعليم، وللمدارس الخاصة تُرفع الإفادة الصادرة من إدارة تراخيص المدارس الخاصة بوزارة التربية والتعليم.",
  },
  {
    question: "لقد حاولت الضغط على زر التقديم، ولكن لم تنجح عملية التقديم؟",
    answer:
      "يرجى التأكد من إدخال جميع المعلومات المطلوبة. إذا واجهتم أي مشاكل أخرى، يرجى إرسال بريد إلكتروني على info@waqfisa.bh.",
  },
  {
    question: "كيف يمكنني التأكد من أن طلبي قد تم إرساله بنجاح؟",
    answer: "سيتم إرسال بريد إلكتروني إليك لتأكيد استلام طلبك.",
  },
];

const ContactPage = () => {
  const { t } = useTranslation("contacts");
  const { locale } = useRouter();

  return (
    <div>
      <PageComponent title={"ContactUs"}>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col max-w-xl gap-4 pt-6 mx-auto">
            <p className={cn("text-xl font-medium")}>{t("faq")}</p>
            <Accordion type="single" collapsible className="w-full text-start">
              {(locale === "ar" ? arabicFaqs : englishFaqs).map(
                (faq, index) => (
                  <AccordionItem value={`${index}`} key={index}>
                    <AccordionTrigger className="text-start">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </div>
          <div className="mx-auto prose text-center divide-y">
            <div>
              <h4>{t("needFurtherAssistance")}</h4>
              <div className="flex flex-wrap items-baseline justify-center gap-1">
                <h4>{t("emailUsOn")}</h4>
                <a href="mailto:info@waqfisa.bh">info@waqfisa.bh</a>
              </div>
            </div>
          </div>
        </div>
      </PageComponent>
    </div>
  );
};

export default ContactPage;
