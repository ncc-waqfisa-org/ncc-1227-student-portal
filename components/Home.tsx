import { CardInfoComponent } from "./CardInfo";
import logs from "../public/svg/logs.svg";
import search from "../public/svg/search.svg";
import check from "../public/svg/check-dark.svg";
import info from "../public/svg/info.svg";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AppContexts";
import { useTranslation } from "react-i18next";
import { FC } from "react";

interface Props {
  comeBack?: boolean;
}

export const HomeComponent: FC<Props> = ({ comeBack }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { haveActiveApplication, haveScholarships } = useAppContext();
  return (
    <div>
      <div className="flex flex-col gap-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-900 ">
          {t("availableServices")}
        </h1>

        {comeBack && (
          <div className="grid w-full max-w-4xl grid-cols-1 gap-10 mx-auto md:grid-cols-2 place-items-center">
            <CardInfoComponent
              icon={info}
              title={"قريباً"}
              description={"عد في 03/07/2023 للتسجيل"}
            ></CardInfoComponent>
            <CardInfoComponent
              icon={info}
              title={"Coming Soon"}
              description={"Come back on 03/07/2023 to enroll"}
            ></CardInfoComponent>
          </div>
        )}

        {!comeBack && (
          <div className="grid w-full max-w-4xl grid-cols-1 gap-10 mx-auto md:grid-cols-2 place-items-center">
            {!haveActiveApplication && (
              <CardInfoComponent
                icon={logs}
                title={t("applyForScholarship")}
                description={t("applyForScholarshipDescription")}
                action={() => router.push("/applications")}
                actionTitle={t("enrollNow") ?? "Enroll Now"}
              ></CardInfoComponent>
            )}
            {haveActiveApplication && (
              <CardInfoComponent
                icon={search}
                title={t("trackApplication")}
                description={t("trackApplicationDescription")}
                action={() => router.push("/applications")}
                actionTitle={t("track") ?? "Track"}
              ></CardInfoComponent>
            )}
            {haveScholarships && (
              <CardInfoComponent
                icon={check}
                title={t("scholarships")}
                description={t("trackApplicationDescription")}
                action={() => router.push("/scholarship")}
                actionTitle={t("seeMyScholarships") ?? "See My Scholarships"}
              ></CardInfoComponent>
            )}
            <CardInfoComponent
              icon={info}
              title={t("informationCenter")}
              description={t("informationCenterDescription")}
              action={() => router.push("/contact")}
              actionTitle={t("getInfo") ?? "Get Info"}
            ></CardInfoComponent>
          </div>
        )}
      </div>
    </div>
  );
};
