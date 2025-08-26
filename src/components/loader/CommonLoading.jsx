import React from "react";
import * as pkg from "react-spinners";
const { BarLoader } = pkg;

const CommonLoading = () =>
  BarLoader && <BarLoader color="#008cff" height={5} width={100} />;

export default CommonLoading;
