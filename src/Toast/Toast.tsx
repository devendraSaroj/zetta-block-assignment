import React, { useEffect } from "react";
import classNames from "./Toast.module.css";
import { createPortal } from "react-dom";
import { useAppSelector } from "../hooks/store-hooks";

type Props = {
  message: string;
  onRequestClose: () => void;
};

const Toast = (props: Props) => {
  useEffect(() => {
    // close toast automatically after 3sec
    const timeout = setTimeout(() => {
      props.onRequestClose();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return createPortal(
    <div className={classNames.container}>
      <p>{props.message}</p>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Toast;
