import React from "react";
import { useTranslation } from "react-i18next";

const ErrorComponent = () => {
  const { t } = useTranslation("errors");

  return (
    <div className="mx-auto w-96 bg-white shadow card">
      <div className="card-body">
        <h2 className="card-title">{t("somethingWentWrong")}</h2>
        <p>{t("dataLoadingError")}</p>
        <div className="justify-end card-actions">
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            {t("tryAgain")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
