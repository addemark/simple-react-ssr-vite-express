import VoiceRecordButton from "@/components/review/PlayButton";
import {
  ReviewActionsType,
  setReviewDataAction,
} from "@/redux/actions/reviewActions";
import { StateType } from "@/redux/reducers";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

type VoiceRecorderVisualizerProps = {
  className?: string;
  updateRecording?: Dispatch<SetStateAction<boolean>>;
};

const VoiceRecorderVisualizer: React.FC<VoiceRecorderVisualizerProps> = ({
  className,
  updateRecording,
}: VoiceRecorderVisualizerProps) => {
  const defaultReview = useSelector((state: StateType) => state.review);
  const dispatch = useDispatch<ReviewActionsType>();
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(defaultReview?.duration || 0); // in seconds
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [transcript, setTranscript] = useState(
    defaultReview?.reviewData?.content || ""
  );
  const recognitionRef = useRef<any | null>(null);
  // Reset local state when Redux state is reset
  useEffect(() => {
    setElapsed(defaultReview?.duration || 0);
    setTranscript(defaultReview?.reviewData?.content || "");
  }, [defaultReview?.duration]);

  const toggleRecording = () => {
    if (isRecording) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      stopListening();
    } else {
      startListening();
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    updateRecording?.((prev: boolean) => !prev);
    setIsRecording((prev) => !prev);
  };

  const formatTime = useMemo(() => {
    return (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
        2,
        "0"
      )}`;
    };
  }, []);

  useEffect(() => {
    dispatch(
      setReviewDataAction({
        reviewData: {
          _id: defaultReview.reviewData?._id || "",
          type: "audio",
          content: transcript.trim(),
        },
        duration: elapsed,
        language: "ro-RO",
      })
    );
  }, [transcript]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ro-RO";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptChunk + " ");
        } else {
          interimTranscript += transcriptChunk;
        }
      }
    };

    recognitionRef.current = recognition;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startListening = () =>
    recognitionRef.current && recognitionRef.current?.start();
  const stopListening = () =>
    recognitionRef.current && recognitionRef.current?.stop();

  return (
    <div
      className={`flex flex-col items-center space-y-4 text-black rounded-xl w-full max-w-md mx-auto ${
        className || ""
      }`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <WaveformBar isRecording={isRecording} />
        <VoiceRecordButton onClick={toggleRecording} className="mx-4" />
        <WaveformBar isRecording={isRecording} />
      </div>
      <div className="text-lg font-mono">{formatTime(elapsed)}</div>
    </div>
  );
};

const WaveformBar = ({ isRecording }: { isRecording: boolean }) => (
  <div className="flex space-x-1 h-12 items-center flex-1">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className={`w-1 rounded bg-black ${
          isRecording ? "animate-pulse" : "bg-opacity-30"
        }`}
        style={{
          height: isRecording ? `${Math.random() * 100}%` : "20%",
          transition: "height 0.3s ease-in-out",
        }}
      />
    ))}
  </div>
);

export default VoiceRecorderVisualizer;
export { WaveformBar };
