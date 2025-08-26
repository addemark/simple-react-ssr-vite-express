import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

type ReviewButtonProps = {
  onClick?: () => void;
  className?: string;
};

const BackButton = ({
  onClick,
  className,
}: ReviewButtonProps): React.JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={`${className} bg-gray-500 rounded-full p-2 flex items-center justify-center shadow-md w-10 h-10`}
    >
      <ArrowLeftIcon className="h-5 w-5 text-white" />
    </div>
  );
};

export default BackButton;
