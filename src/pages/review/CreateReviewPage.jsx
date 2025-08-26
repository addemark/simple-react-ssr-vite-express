import React, { useEffect, useState } from "react";
import placeHolder from "@/assets/review/main-pic.png"; // Placeholder image path
import logo from "@/assets/Logo-brandbel.svg";
import ReviewButton from "@/components/review/ButtonReview.jsx"; // Importing the ReviewButton component
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setReviewDataIdAction,
  setReviewDataTypeAction,
} from "@/redux/actions/reviewActions";

function CreateReview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);

    // Check for speech recognition support only on client side
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechRecognitionSupported(true);
      }
    }
  }, []);

  return (
    <div className="container px-5 py-5 bg-black text-white h-lvh w-lvw">
      <div className="flex items-center justify-center mb-5">
        <img src={logo} alt="imagine companie" className="mb-5" />
      </div>
      <img src={placeHolder} alt="imagine companie" className="mb-5" />
      <div className="flex flex-col w-full h-fit space-y-2 xl:space-x-4 overflow-x-scroll p-2 scrollbar-hidden">
        <h6 className="text-center"> Multumim ca ai vizitat regina maria!</h6>
        <h1 className="text-white text-2xl text-center mb-10">
          Cum iti doresti sa creezi o recenzie?
        </h1>

        <ReviewButton
          type="text"
          onClick={() => {
            dispatch(setReviewDataIdAction(reviewId || ""));
            dispatch(setReviewDataTypeAction("text"));
            navigate("/new-text-review/" + reviewId);
          }}
          className="mb-3"
        />
        {speechRecognitionSupported && (
          <ReviewButton
            type="audio"
            onClick={() => {
              dispatch(setReviewDataIdAction(reviewId || ""));
              navigate("/new-audio-review/" + reviewId);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CreateReview;
