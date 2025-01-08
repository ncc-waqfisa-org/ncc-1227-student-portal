import React, { FC } from "react";
import { cn } from "../src/lib/utils";
import { useTranslation } from "react-i18next";

type Props = {
  onChange: (type: "masters" | "bachelor") => void;
  type: "masters" | "bachelor";
};

export const BMTabs: FC<Props> = ({ type, onChange }) => {
  const { t: commonT } = useTranslation("common");

  return (
    <div role="tablist" className="w-full max-w-lg mx-auto tabs tabs-boxed">
      <button
        type="button"
        onClick={() => onChange("bachelor")}
        role="tab"
        className={cn("tab text-lg", type === "bachelor" && "tab-active")}
      >
        {commonT("bachelor")}
      </button>
      <button
        type="button"
        onClick={() => onChange("masters")}
        role="tab"
        className={cn("tab text-lg", type === "masters" && "tab-active")}
      >
        {commonT("masters")}
      </button>
    </div>
  );
};
