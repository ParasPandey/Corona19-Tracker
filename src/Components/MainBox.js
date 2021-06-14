import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import InfoBoxes from "./InfoBoxes";
import MyMap from "./Map";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import { prettyPrintStat } from "../utility";

const MainBox = ({
  countries,
  setCountries,
  mapCountries,
  setmapCountries,
  casesType,
  setCasesType,
}) => {
  const [country, setCountry] = useState("worldwide");
  const [countriesInfo, setcountriesInfo] = useState({});
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [zoom, setZoom] = useState(3.5);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("https://disease.sh/v3/covid-19/all");
      setcountriesInfo(data.data);
    };
    fetchData();
  }, []);

  const onCountryChange = async (event) => {
    console.log("country changed");
    const countryCode = event.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const countriesData = await axios.get(url);
    setcountriesInfo(countriesData.data);
    setCountry(countryCode);
    setMapCenter([
      countriesData?.data.countryInfo?.lat || 20.5937,
      countriesData?.data.countryInfo?.long || 78.9629,
    ]);
    setZoom(4);
  };
  return (
    <div className="mainbox">
      <div className="header">
        <h1>Covid19 Tracker</h1>
        <FormControl className="dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries?.map((c) => (
              <MenuItem key={c.name} value={c.value}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="infoboxes">
        <InfoBoxes
          onClick={(e) => setCasesType("cases")}
          title="Corona Cases"
          isRed
          active={casesType === "cases"}
          cases={prettyPrintStat(countriesInfo.todayCases)}
          total={numeral(countriesInfo.cases).format("0.0a")}
        />
        <InfoBoxes
          onClick={(e) => setCasesType("recovered")}
          title="Recovered"
          active={casesType === "recovered"}
          cases={prettyPrintStat(countriesInfo.todayRecovered)}
          total={numeral(countriesInfo.recovered).format("0.0a")}
        />
        <InfoBoxes
          onClick={(e) => setCasesType("deaths")}
          title="Death"
          isRed
          active={casesType === "deaths"}
          cases={prettyPrintStat(countriesInfo.todayDeaths)}
          total={numeral(countriesInfo.deaths).format("0.0a")}
        />
      </div>
      <MyMap
        casesType={casesType}
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
        zoom={zoom}
        countries={mapCountries}
      />
    </div>
  );
};

export default MainBox;
