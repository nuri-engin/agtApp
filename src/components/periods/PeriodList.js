//Core
import React from "react";
import { Link } from "react-router-dom";

//UI
import PeriodSummary from "./PeriodSummary";

const PeriodList = ({ periods }) => {
  return (
    <div className="period-list section">
      {periods &&
        periods.map(period => {
          return (
            <Link to={"/period/" + period.title} key={period.id}>
              <PeriodSummary period={period} />
            </Link>
          );
        })}
    </div>
  );
};

export default PeriodList;
