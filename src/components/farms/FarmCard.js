//Core
import React from "react";
import moment from "moment";

const FarmCard = ({ farm }) => {
  return (
    <div className="farm-card section">
      <div className="card z-depth-0 farm-card">
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

export default FarmCard;
