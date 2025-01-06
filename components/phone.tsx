import React from "react";

import PhoneInput, {
  DefaultInputComponentProps,
  Props,
  Value,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "../src/lib/utils";

export interface PhoneProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: Value | string;
  onChange(value?: Value | React.ChangeEvent<HTMLInputElement>): void;
}

const PhoneNumberInput = React.forwardRef<
  Props<DefaultInputComponentProps>,
  PhoneProps
>(({ className, type, ...props }, ref) => {
  const css = `
  .phoneNumber {
    direction: ltr;
  }
  .phoneNumber input {
      background: transparent;
      height: 2.9rem;
      border-inline-start-width: 1px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
      padding: 0rem 0.5rem;
      border-color: black;
      ${props.disabled && " border-color: #bdbdbd; color: gray;"}
        }

        .PhoneInputCountry {
          padding: 0 0.8rem;
      }
        `;
  return (
    <div className="relative">
      <style>{css}</style>
      <PhoneInput
        international
        defaultCountry="BH"
        {...props}
        className={cn(
          "phoneNumber border-border flex h-12  w-full rounded-md !pr-0  border pl-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          props.disabled && "cursor-not-allowed bg-[#d8dbde] border-[#d8dbde] ",
          className
        )}
        type="phone"
      />
      {props.disabled && (
        <div className="absolute inset-0 cursor-not-allowed"></div>
      )}
    </div>
  );
});
PhoneNumberInput.displayName = "PhoneNumberInput";

export { PhoneNumberInput };
