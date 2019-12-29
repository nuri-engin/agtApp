//Core
import React from "react";
import moment from "moment";

const PeriodCard = ({ period, user_orders, farm_orders }) => {
  return (
    <div className="period-card section">
      <div className="card z-depth-0 period-card">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{period.title}</span>
          <p>
            Olusturan: {period.authorFirstName} {period.authorLastName}
          </p>
          <p className="grey-text">
            Tarih: {moment(period.createdAt.toDate()).calendar()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeriodCard;
