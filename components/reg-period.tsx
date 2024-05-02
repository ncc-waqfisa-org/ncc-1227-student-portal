import React, { useRef } from "react";
import { useAppContext } from "../contexts/AppContexts";
import dayjs, { Dayjs } from "dayjs";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";

import { FiAlertCircle, FiArrowRight } from "react-icons/fi";

import { cn } from "../src/lib/utils";

import { useTranslation } from "react-i18next";
import { Batch } from "../src/API";
import { useRouter } from "next/router";

export const RegPeriod = () => {
  const { batch } = useAppContext();
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <div className="grid gap-6 text-current sm:gap-3">
      <div className="grid items-center gap-2 sm:gap-4 sm:grid-cols-2">
        <div className="text-sm font-medium">{t("creatingNewAccount")}</div>
        <div className="flex items-center gap-1 text-sm text-current opacity-80 ">
          {dayjs(batch?.signUpStartDate)
            .locale(locale === "ar" ? arLocale : enLocale)
            .format("MMM DD, YYYY")}
          <span className="rtl:rotate-180">
            <FiArrowRight />
          </span>
          {dayjs(batch?.signUpEndDate)
            .endOf("day")
            .locale(locale === "ar" ? arLocale : enLocale)
            .format("MMM DD, YYYY")}
        </div>
      </div>
      <div className="grid items-center gap-2 sm:gap-4 sm:grid-cols-2">
        <div className="text-sm font-medium">{t("creatingNewApplication")}</div>
        <div className="flex items-center gap-1 text-sm text-current opacity-80 ">
          {dayjs(batch?.createApplicationStartDate)
            .locale(locale === "ar" ? arLocale : enLocale)
            .format("MMM DD, YYYY")}
          <span className="rtl:rotate-180">
            <FiArrowRight />
          </span>
          {dayjs(batch?.createApplicationEndDate)
            .endOf("day")
            .locale(locale === "ar" ? arLocale : enLocale)
            .format("MMM DD, YYYY")}
        </div>
      </div>
      <div className="grid items-center gap-2 sm:gap-4 sm:grid-cols-2">
        <div className="text-sm font-medium">
          {t("lastDayToUpdateApplications")}
        </div>
        <div className="text-sm text-current opacity-80 ">
          {dayjs(batch?.updateApplicationEndDate)
            .endOf("day")
            .locale(locale === "ar" ? arLocale : enLocale)
            .format("MMM DD, YYYY")}
        </div>
      </div>
    </div>
  );
};

export const RegPeriodDialog = ({ className }: { className?: string }) => {
  const { batch, signUpEnabled } = useAppContext();
  const regDialog = useRef<HTMLDialogElement>(null);
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  interface DateInfo {
    upcoming: {
      date: string;
      title: string;
    } | null;
  }

  function getUpcomingBatchDate(
    batch: Batch,
    locale: string | undefined
  ): DateInfo {
    const dates: Array<{ key: string; value: string | null }> = [
      {
        key: "createApplicationStartDate",
        value: batch.createApplicationStartDate ?? null,
      },
      {
        key: "createApplicationEndDate",
        value: batch.createApplicationEndDate ?? null,
      },
      {
        key: "updateApplicationEndDate",
        value: batch.updateApplicationEndDate ?? null,
      },
      // { key: "signUpStartDate", value: batch.signUpStartDate ?? null },
      // { key: "signUpEndDate", value: batch.signUpEndDate ?? null },
    ];

    // Filter out null values and parse dates
    const validDates = dates
      .filter((date) => date.value !== null)
      .map((date) => ({
        key: date.key,
        value: dayjs(date.value as string),
      }));

    // If there are no valid dates, return 'Registration period'
    if (validDates.length === 0) {
      return { upcoming: null };
    }

    // Find the nearest upcoming date
    const now = dayjs();
    const upcomingDate = validDates.reduce(
      (
        closestDate: { key: string; value: Dayjs } | null,
        currentDate: { key: string; value: Dayjs }
      ) =>
        currentDate.value.isAfter(now) &&
        (closestDate === null || currentDate.value.isBefore(closestDate.value))
          ? currentDate
          : closestDate,
      null
    );

    if (upcomingDate === null) {
      return { upcoming: null };
    }

    // Format the date and return
    const formattedDate = upcomingDate.value
      .locale(locale === "ar" ? arLocale : enLocale)
      .format("MMM DD, YYYY");
    const title = getTitle(upcomingDate.key, upcomingDate.value);

    return { upcoming: { date: formattedDate, title } };
  }

  function getTitle(key: string, date: Dayjs): string {
    const now = dayjs();
    if (key === "createApplicationStartDate") {
      return `${t("createApplicationStartsIn")} ${date.diff(now, "day")} ${t(
        "days"
      )}`;
    } else if (key === "createApplicationEndDate") {
      return t("creatingNewApplicationEndDate");
    } else if (key === "updateApplicationEndDate") {
      return t("lastDayToUpdateApplications");
    } else if (key === "signUpStartDate") {
      return t("creatingNewAccountStart");
    } else if (key === "signUpEndDate") {
      return t("creatingNewAccountEnds");
    } else {
      return t("upcomingDate");
    }
  }

  return (
    <div>
      {batch && signUpEnabled && (
        <button
          className={cn("btn btn-ghost", className)}
          onClick={() => regDialog.current?.showModal()}
        >
          {getUpcomingBatchDate(batch, locale).upcoming
            ? `${getUpcomingBatchDate(batch, locale).upcoming?.title}:
            ${getUpcomingBatchDate(batch, locale).upcoming?.date}`
            : t("registrationPeriod")}
          <span>
            <FiAlertCircle />
          </span>
        </button>
      )}
      <dialog ref={regDialog} className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">{t("registrationPeriod")}</h3>
            <RegPeriod />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="absolute btn btn-sm btn-circle btn-ghost ltr:right-2 rtl:left-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
