import Image from "next/image";
import { FC } from "react";
import { cn } from "../src/lib/utils";

interface Props {
  icon: string;
  title: string;
  description: string;
  action?: () => void;
  actionTitle?: string;
  haveMaxWidth?: boolean;
}

export const CardInfoComponent: FC<Props> = ({
  haveMaxWidth = true,
  icon,
  title,
  description,
  action,
  actionTitle,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between w-full  p-8 text-center bg-white shadow rounded-3xl prose prose-h1:font-semibold prose-h1:text-2xl shadow-base-200 card",

        haveMaxWidth && "max-w-sm"
      )}
    >
      <div className="flex items-center justify-center w-[5.3rem] h-[5.3rem] card bg-primary-highlight ">
        <Image
          className="object-contain w-11 aspect-square"
          src={icon}
          alt="icon"
        ></Image>
      </div>
      <h1 className="mt-5">{title}</h1>
      <p>{description}</p>
      {action && (
        <button
          type="button"
          className="w-full text-white btn btn-primary"
          onClick={action}
        >
          {actionTitle}
        </button>
      )}
    </div>
  );
};
