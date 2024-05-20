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

const ContactPage = () => {
  const { t } = useTranslation("contacts");

  return (
    <div>
      <PageComponent title={"ContactUs"}>
        <div className="mx-auto prose text-center divide-y">
          <div>
            <h4>{t("email")}</h4>
            <a href="mailto:info@waqfisa.bh">info@waqfisa.bh</a>
          </div>
        </div>
        {/* <div className="flex flex-col max-w-xl gap-4 pt-16 mx-auto">
          <p className={cn("text-xl font-medium")}>F&Q</p>
          <Accordion type="single" collapsible className="w-full text-start">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div> */}
      </PageComponent>
    </div>
  );
};

export default ContactPage;
