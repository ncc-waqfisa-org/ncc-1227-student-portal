import React, { FC } from "react";

import { HomeComponent } from "../components/Home";

import { BachelorProvider } from "../contexts/BachelorContexts";
import { MastersProvider } from "../contexts/MastersContexts";
import { MastersHomeComponent } from "./masters/MastersHome";

type TDashboard = {
  type: "masters" | "bachelor";
};

export const Dashboard: FC<TDashboard> = ({ type }) => {
  switch (type) {
    case "bachelor":
      return (
        <BachelorProvider>
          <BachelorDashboard />
        </BachelorProvider>
      );
    case "masters":
      return (
        <MastersProvider>
          <MastersDashboard />
        </MastersProvider>
      );
  }
};

const BachelorDashboard = () => {
  return <HomeComponent />;
};

const MastersDashboard = () => {
  return <MastersHomeComponent />;
};
