import React, { useState } from "react";
import { Storage } from "aws-amplify";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Props {
  storageKey: string | undefined | null;
  showName?: boolean;
}

export default function GetStorageLinkComponent({
  storageKey,
  showName,
}: Props) {
  const [link, setLink] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getLink(key: string) {
    setIsLoading(true);
    let link = await Storage.get(key);
    setLink(link);
    setIsLoading(false);
  }

  const { t } = useTranslation("common");
  const { t: tErrors } = useTranslation("errors");

  function extractTextBetweenHashTags(str: string): string {
    const hashTagRegex = /#([^#]+)#/;
    const match = str.match(hashTagRegex);
    if (match !== null) {
      return match[1];
    }
    return "";
  }

  return (
    <div>
      {storageKey &&
        (!link ? (
          <button
            disabled={isLoading}
            type="button"
            className={`btn btn-ghost btn-sm text-primary hover:bg-primary/20 ${
              isLoading && "loading"
            }`}
            onClick={() => getLink(storageKey)}
          >
            {isLoading
              ? t("loading")
              : showName
              ? extractTextBetweenHashTags(storageKey) || t("getLink")
              : t("getLink")}
          </button>
        ) : (
          <Link className="btn btn-success btn-sm" target="_blank" href={link}>
            {showName
              ? `View ${extractTextBetweenHashTags(storageKey)}` ||
                `${t("view")} ${t("document")}`
              : `${t("view")} ${t("document")}`}
          </Link>
        ))}
      {!storageKey && (
        <div className="text-error">{tErrors("documentNotSubmitted")}</div>
      )}
    </div>
  );
}
