import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoaderAnimation from "../login-card/LoaderAnimation";
import FormWrapper from "../common/FormWrapper";

const UserApproved = () => {
  const [shoulderWidth, setShoulderWidth] = useState("");
  const [recommendedSize, setRecommendedSize] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const width = parseFloat(shoulderWidth);
    if (isNaN(width)) {
      setRecommendedSize("Invalid measurement");
      return;
    }

    if (width < 16) setRecommendedSize("XS");
    else if (width < 18) setRecommendedSize("S");
    else if (width < 20) setRecommendedSize("M");
    else if (width < 22) setRecommendedSize("L");
    else if (width < 24) setRecommendedSize("XL");
    else if (width < 26) setRecommendedSize("2XL");
    else if (width < 28) setRecommendedSize("3XL");
    else setRecommendedSize("4XL");
  };

  return (
    <FormWrapper title="Measure Your Shoulder Width" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <label htmlFor="shoulderWidth" className="block text-lg font-semibold">
          Enter your shoulder width (in inches):
        </label>
        <input
          type="text"
          id="shoulderWidth"
          value={shoulderWidth}
          onChange={(e) => setShoulderWidth(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 18"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Get Recommended Size
        </button>
        {recommendedSize && (
          <p className="mt-4 text-lg font-bold text-center">
            Recommended Size: {recommendedSize}
          </p>
        )}
      </div>
    </FormWrapper>
  );
};

export default UserApproved;
