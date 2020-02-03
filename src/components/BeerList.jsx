import React from "react";

export function BeerList({beers}) {
  return (
    <ul className="List">
      {beers.map(beer => {
        return (
          <li key={beer.id} className="List-item">
            <figure className="List-item-img">
              <img src={beer.image_url} alt="beer" />
            </figure>
            <div className="List-item-info">
              <p>{beer.name}</p>
              <ul>
                <li>
                  <small>ABV: {beer.abv}</small>
                </li>
                <li>
                  <small>
                    Volume: {beer.volume.unit} {beer.volume.unit}
                  </small>
                </li>
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
