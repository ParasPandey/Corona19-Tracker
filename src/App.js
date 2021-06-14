import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styling/App.css";
import MainBox from "./Components/MainBox";
import TableBox from "./Components/TableBox";
import { sortFunc } from "./utility";
import "leaflet/dist/leaflet.css";
import { Footer } from "./Components/Footer";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("https://disease.sh/v3/covid-19/countries");
      const countriesData = data.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const tData = sortFunc(data.data);
      setmapCountries(data.data);
      setTableData(tData);
      setCountries(countriesData);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="app">
        <MainBox
          countries={countries}
          setCountries={setCountries}
          mapCountries={mapCountries}
          setmapCountries={setmapCountries}
          casesType={casesType}
          setCasesType={setCasesType}
        />
        <TableBox tableData={tableData} casesType={casesType} />
      </div>
      <Footer />
    </>
  );
};

export default App;
