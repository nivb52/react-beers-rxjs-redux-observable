import React from "react";
import './beer-loader.css';

export default function BeerLoader() {
  return (
    <>
      <div className="wrapper">
        <div className="glass-wrapper">
          <div className="glass">
            <div className="beer">
              <div className="foam">
                <span className="foambubble"></span>
                <span className="foambubble"></span>
                <span className="foambubble"></span>
                <span className="foambubble"></span>
                <span className="foambubble"></span>
              </div>
              <div className="bubbles">
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
              </div>
            </div>
          </div>
          <div className="foamtop">
            <span className="ft-bubble"></span>
            <span className="ft-bubble"></span>
            <span className="ft-bubble"></span>
            <span className="ft-bubble"></span>
          </div>
          <div className="coaster"></div>
        </div>
      </div>
    </>
  );
}
