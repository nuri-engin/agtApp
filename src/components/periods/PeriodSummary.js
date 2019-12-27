//Core
import React from "react";
import moment from "moment";

const PeriodSummary = ({ period }) => {
  return (
    <div className="period-list section">
      <div className="card z-depth-0 period-summary">
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

export default PeriodSummary;
