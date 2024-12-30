import React, { FC } from "react";

import { HomeComponent } from "../components/Home";

import { useTranslation } from "next-i18next";

type TDashboard = {
  type: "masters" | "bachelor";
};

export const Dashboard: FC<TDashboard> = ({ type }) => {
  switch (type) {
    case "bachelor":
      return <BachelorDashboard />;
    case "masters":
      return <MastersDashboard />;
  }
};

const BachelorDashboard = () => {
  const comeBack: boolean = false;
  return <HomeComponent comeBack={comeBack}></HomeComponent>;
};
const MastersDashboard = () => {
  return <div>BachelorDashboard</div>;
};
