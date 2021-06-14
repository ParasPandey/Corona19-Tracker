import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "../Styling/Map.css";
import { CircleMarker, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    rgb: "rgb(251, 68, 67)",
  },
  recovered: {
    rgb: "rgb(125, 215, 29)",
  },
  deaths: {
    rgb: "rgb(251, 68, 67)",
  },
};

const MyMap = ({ casesType, mapCenter, zoom, countries, setMapCenter }) => {
  function ChangeMap({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  return (
    <div className="map">
      <MapContainer>
        <ChangeMap center={mapCenter} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {countries.map((country, k) => {
          return (
            <CircleMarker
              key={k}
              center={[country.countryInfo.lat, country.countryInfo.long]}
              color={casesTypeColors[casesType].rgb}
              fillColor={casesTypeColors[casesType].rgb}
              fillOpacity={0.3}
              radius={20 * Math.log(country[casesType] / 45000)}
            >
              <Popup>
                <div className="info-container">
                  <div
                    className="info-flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  ></div>
                  <div className="info-name">{country.country}</div>
                  <div className="info-confirmed">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="info-recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="info-deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MyMap;
