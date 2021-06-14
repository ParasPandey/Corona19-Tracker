import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../Styling/InfoBox.css";

const InfoBoxes = ({ title, cases, total, active, isRed, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography
          className="infoBox__title"
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <h3 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h3>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBoxes;
