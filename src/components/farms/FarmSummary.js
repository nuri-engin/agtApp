//Core
import React from "react";
import moment from "moment";

const FarmSummary = ({ farm }) => {
  return (
    <div className="farm-list section">
      <div className="card z-depth-0 farm-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{farm.title}</span>
          <p>
            Olusturan: {farm.authorFirstName} {farm.authorLastName}
          </p>
          <p className="grey-text">
            {/* Tarih: {moment(farm.createdAt.toDate()).calendar()} */}
            Tarih: {moment().calendar()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmSummary;
