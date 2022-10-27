import React, { ReactElement } from "react";
import classNames from "./LoaderWrapper.module.css";

type Props = {
  loading: boolean;
  children: ReactElement;
};

const LoaderWrapper = (props: Props) => {
  return (
    <div className={classNames.wrapper}>
      {props.loading && (
        <div className={classNames.loader_container}>
          <img
            className={classNames.loader}
            src="https://www.zettablock.com/assets/logo-animation.gif"
          />
        </div>
      )}
      {props.children}
    </div>
  );
};

export default LoaderWrapper;
