import React, { useState } from "react";
// import { MicrophoneIcon, StopIcon } from "@heroicons/react/24/outline";
import Microphone from "@/assets/review/mic.svg";
import Stop from "@/assets/review/stop.svg";

type VoiceRecordButtonProps = {
  onClick?: () => void;
  className?: string;
};

const VoiceRecordButton = ({
  onClick,
  className,
}: VoiceRecordButtonProps): React.JSX.Element => {
  const [isRecording, setIsRecording] = useState(false);

  const handleToggle = () => {
    setIsRecording((prev) => !prev);
    onClick?.();
    // Add recording logic here (start/stop)
  };

  return (
    <button
      onClick={handleToggle}
      className={`bg-black rounded-full p-4 flex items-center justify-center shadow-md max-w-15 ${
        className || ""
      }`}
    >
      {isRecording ? (
        <img src={Stop} alt="Stop" className="h-5 w-5" />
      ) : (
        <img src={Microphone} alt="Microphone" className="h-5 w-5" />
      )}
    </button>
  );
};

export default VoiceRecordButton;
