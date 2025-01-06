import { useRouter } from "next/router";
import { CardInfoComponent } from "./CardInfo";
import info from "public/svg/info.svg";

export interface NoAvailableBatchProps {
  type: "masters" | "bachelor";
}

export const NoAvailableBatch = ({ type }: NoAvailableBatchProps) => {
  const { locale } = useRouter();
  const isArabic = locale === "ar";

  return (
    <>
      {type === "masters" && (
        <CardInfoComponent
          icon={info}
          title={isArabic ? "التسجيل" : "Registration"}
          description={
            isArabic
              ? "التسجيل للماجستير غير مفتوح"
              : "Registration for masters is not open"
          }
        ></CardInfoComponent>
      )}
      {type === "bachelor" && (
        <CardInfoComponent
          icon={info}
          title={isArabic ? "التسجيل" : "Registration"}
          description={
            isArabic
              ? "التسجيل للبكلريوس غير مفتوح"
              : "Registration for bachelor is not open"
          }
        ></CardInfoComponent>
      )}
    </>
  );
};
