// import React from 'react'
import { ButtonProps, SxProps, Theme, } from "@mui/material";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import CloseButton from "./CloseButton";
import ResetButton from "./ResetButton";
import LoginButton from "./LoginButton";
import Button from "./Button";
import ClearButton from "./ClearButton";
import { ReactNode } from "react";
import UpdateButton from "./UpdateButton";

interface Props extends Omit<ButtonProps, "type"> {
  type: "save" | "close" | "cancel" | "reset" | "login" | "button" | "clear"|"update"|"buttonSubmit";
  isLoading?: boolean;
  label?: string;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
  isDisabled?: boolean;
  buttonType?: "submit" | "button";
  labelProps?: SxProps<Theme>;
}

const ButttonComp = ({ type, onClick,icon,isDisabled,buttonType, ...props }: Props) => {
  return (
    <>
      {type === "save" ? (
        <SaveButton
          onClick={onClick}
          {...props}
          isDisabled={isDisabled}
          label={props.label}
          type={buttonType}
        />
      ) : null}
      {type === "cancel" ? (
        <CancelButton onClick={onClick} {...props} isDisabled={isDisabled} />
      ) : null}
      {type === "close" ? (
        <CloseButton onClick={onClick} {...props} type={buttonType} />
      ) : null}
      {type === "reset" ? (
        <ResetButton onClick={onClick} {...props} type={buttonType} />
      ) : null}
      {type === "login" ? (
        <LoginButton onClick={onClick} {...props} type={buttonType} />
      ) : null}
      {type === "clear" ? (
        <ClearButton
          onClick={onClick}
          {...props}
          type={buttonType}
          isDisabled={isDisabled}
        />
      ) : null}
      {type === "update" ? (
        <UpdateButton
          {...props}
          onClick={onClick}
          type={buttonType}
        />
      ) : null}
      {type === "button" ? (
        <Button onClick={onClick} {...props} type={buttonType} icon={icon} />
      ) : null}
      {type === "buttonSubmit" ? (
        <Button onClick={onClick} {...props} type='submit' icon={icon} />
      ) : null}
    </>
  );
};

export default ButttonComp;
