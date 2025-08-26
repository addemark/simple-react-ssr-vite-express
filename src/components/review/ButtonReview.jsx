import { ArrowRight } from "lucide-react";
import sound from "@/assets/review/soundwave.svg";
import text from "@/assets/review/line-height.svg";

const icons = {
  audio: <img src={sound} alt="Audio Review Icon" className="h-5 w-5" />,
  text: <img src={text} alt="Text Review Icon" className="h-5 w-5" />,
};

const ReviewButton = ({ type = "audio", onClick, className }) => {
  const label =
    type === "audio" ? "Lasa un review audio" : "Lasa un review text";
  const bg = type === "audio" ? "bg-purple-300" : "bg-lime-300";

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-5 ${bg} rounded-3xl shadow-sm hover:bg-gray-200 transition ${
        className || ""
      }`}
    >
      <div className="flex items-center space-x-15 w-xs">
        <div className="text-gray-700">{icons[type]}</div>
        <span className="text-sm text-gray-800 text-center">{label}</span>
      </div>
      <ArrowRight className="h-5 w-5 text-gray-500" />
    </button>
  );
};

export default ReviewButton;
