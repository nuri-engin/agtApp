//Core
import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

//UI
import FarmSummary from "./FarmSummary";

const FarmList = ({ farms }) => {
  const sampleFarm = {
      id: 1,
      title: "Ekmekci",
      content: "Beyaz Ekmek",
      authorFirstName: "Nuri",
      authorLastName: "Engin",
      createdAt: new Date().getTime()
  } 

  return (
    <div className="farm container">
      <br />
      <button className="btn grey lighten-2 z-depth-0">
        <NavLink to="/create-farm">Yeni Uretici Ekle</NavLink>
      </button>
      <div className="row">
        <div className="col s12 m6">
          <Link to={"/farm/" + sampleFarm.title} key={sampleFarm.id}>
              <FarmSummary farm={sampleFarm} />
          </Link>

          {/* {farms &&
            farms.map(farm => {
              return (
                <Link to={"/farm/" + farm.title} key={farm.id}>
                  <FarmSummary farm={farm} />
                </Link>
              );
            })} */}
          </div>
          <div className="col s12 m5 offset-m1">
            <p>Search/ Filter</p>
          </div>
        </div>
      </div>
  );
};

export default FarmList;
