import React, { FC } from "react";
import { Application } from "../../src/API";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import glasses from "../../public/svg/glasses.svg";

type TMyScholarships = {
  applications: Application[];
};

export const MyScholarships: FC<TMyScholarships> = ({ applications }) => {
  const { locale } = useRouter();
  const { t } = useTranslation("applications");
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr]">
      {applications.map((application, i) => (
        <Link href={`/scholarship/${application.id}`} key={i}>
          <div className="relative duration-200 hover:cursor-pointer ">
            <div className={`pt-6 shadow card bg-warning`}>
              <div className="p-4 bg-white min-h-[15rem] pt-10 card gap-4 flex flex-col justify-between">
                {/* Status */}
                <div className="flex flex-wrap items-baseline justify-between">
                  <h3 className="text-xl font-semibold">
                    {t(`${application.status}`)}
                  </h3>
                  {/* Submit Date */}
                  <div className=" stat-desc">
                    {t("submitDate")}{" "}
                    {Intl.DateTimeFormat(locale).format(
                      new Date(application.createdAt)
                    )}
                  </div>
                </div>
                {/* Programs */}
                <div>
                  <div className="mb-2 -mt-2 text-sm stat-title">
                    {t("selectedPrograms")}
                  </div>
                  {application.programs?.items.map((program) => (
                    <div
                      key={program?.id}
                      className="whitespace-pre-wrap stat-desc"
                    >
                      {program?.choiceOrder}
                      {"- "}
                      {locale == "ar"
                        ? `${program?.program?.nameAr ?? "-"}-${
                            program?.program?.university?.nameAr ?? "-"
                          }`
                        : `${program?.program?.name}-${program?.program?.university?.name}`}
                    </div>
                  ))}
                </div>
                {/* TODO: make accept and reject functionality */}
                <div className="flex justify-end gap-3">
                  <div className="btn btn-ghost">decline</div>
                  <div className="btn btn-warning">Accepts</div>
                </div>
              </div>
            </div>
            <div
              className={`absolute flex items-center justify-center w-12 h-12 border-2 border-white rounded-full top-2 left-2 bg-warning`}
            >
              <Image
                className="object-contain w-5 aspect-square"
                src={glasses}
                alt="icon"
              ></Image>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
