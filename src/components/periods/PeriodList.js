//Core
import React from "react";
import { Link } from "react-router-dom";

//UI
import PeriodCard from "./PeriodCard";

const PeriodList = ({ periods, user_orders, farm_orders }) => {
  return (
    <div className="period-list section">
      {periods &&
        periods.map(period => {
          return (
            <Link to={"/period/" + period.title} key={period.id}>
              <PeriodCard period={period} user_orders={user_orders} farm_orders={farm_orders} />
            </Link>
          );
        })}
    </div>
  );
};

export default PeriodList;
