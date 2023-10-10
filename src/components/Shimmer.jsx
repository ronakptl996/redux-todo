import React from "react";
import { ShimmerTitle } from "react-shimmer-effects";

const Shimmer = () => {
  return (
    <div className="container d-flex flex-wrap justify-content-around mt-5 pt-2">
      {[...Array(10)].map((_, index) => (
        <>
          <div style={{ width: "300px" }}>
            <ShimmerTitle line={2} gap={10} variant="secondary" />
          </div>
          <div style={{ width: "600px" }}>
            <ShimmerTitle line={2} gap={10} variant="secondary" />
          </div>
          <div style={{ width: "300px" }}>
            <ShimmerTitle line={2} gap={10} variant="secondary" />
          </div>
        </>
      ))}
    </div>
  );
};

export default Shimmer;
