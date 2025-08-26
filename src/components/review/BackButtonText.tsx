import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useTranslation, UseTranslationResponse } from "react-i18next";

type ReviewButtonProps = {
  onClick?: () => void;
  className?: string;
};

const BackButtonText = ({
  onClick,
  className,
}: ReviewButtonProps): React.JSX.Element => {
  const { t }: UseTranslationResponse<"translation", undefined> =
    useTranslation();
  return (
    <div
      onClick={onClick}
      className={`${className}   p-2 flex items-center justify-center shadow-md w-fit h-10 space-x-2`}
    >
      <ArrowLeftIcon className="h-5 w-5 text-white" />
      <span className="text-sm text-white">{t("Recorder.content.back")}</span>
    </div>
  );
};

export default BackButtonText;
