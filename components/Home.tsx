import { CardInfoComponent } from "./CardInfo";
import logs from "../public/svg/logs.svg";
import search from "../public/svg/search.svg";
import info from "../public/svg/info.svg";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AppContexts";
import { useTranslation } from "react-i18next";

export const HomeComponent = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { haveActiveApplication } = useAppContext();
  return (
    <div>
      <div className="flex flex-col gap-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-900 ">
          {t("availableServices")}
        </h1>

        <div className="grid grid-cols-1 gap-10 mx-auto md:grid-cols-2 w-full max-w-4xl place-items-center">
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
          <CardInfoComponent
            icon={info}
            title={t("informationCenter")}
            description={t("informationCenterDescription")}
            action={() => router.push("/contact")}
            actionTitle={t("getInfo") ?? "Get Info"}
          ></CardInfoComponent>
        </div>
      </div>
    </div>
  );
};
