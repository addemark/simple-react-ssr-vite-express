import * as pkg from "react-spinners";
const { PulseLoader } = pkg;

const FallbackLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#008cff" />
    </div>
  );
};

export default FallbackLoading;
