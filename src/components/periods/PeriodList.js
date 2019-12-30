//Core
import React from "react";
import { Link } from "react-router-dom";

//UI
import PeriodCard from "./PeriodCard";

const PeriodList = ({ periods }) => {
  return (
    <div className="period-list section">
      {periods &&
        periods.map(period => {
          return (
            <Link to={"/period/" + period.title} key={period.id}>
              <PeriodCard period={period} />
            </Link>
          );
        })}
    </div>
  );
};

export default PeriodList;
