import Image from "next/image";
import { FC } from "react";

interface Props {
  icon: string;
  title: string;
  description: string;
  action?: () => void;
  actionTitle?: string;
}

export const CardInfoComponent: FC<Props> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm p-8 prose text-center bg-white shadow prose-h1:font-semibold prose-h1:text-2xl shadow-base-200 card rounded-3xl">
      <div className="flex items-center justify-center w-[5.3rem] h-[5.3rem] card bg-primary-highlight ">
        <Image
          className="object-contain w-11 aspect-square"
          src={props.icon}
          alt="icon"
        ></Image>
      </div>
      <h1 className="mt-5">{props.title}</h1>
      <p>{props.description}</p>
      {props.action && (
        <button
          type="button"
          className="w-full text-white btn btn-primary"
          onClick={props.action}
        >
          {props.actionTitle}
        </button>
      )}
    </div>
  );
};
