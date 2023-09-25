import React from "react";
import { ShimmerTitle, ShimmerText, ShimmerBadge } from "react-shimmer-effects";

const Shimmer = () => {
  return (
    <div className="container d-flex flex-wrap justify-content-around mt-5">
      {[...Array(8)].map((_, index) => (
        <div style={{ width: "300px" }}>
          <ShimmerTitle line={2} gap={10} variant="secondary" />
          <ShimmerText line={5} gap={10} />
          <ShimmerBadge width={120} />
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
