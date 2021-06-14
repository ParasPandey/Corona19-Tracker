import React from "react";
import "../Styling/Footer.css";
import { SocialIcon } from "react-social-icons";

export const Footer = () => {
  const date = new Date();
  console.log(date.getFullYear);

  return (
    <div className="footer">
      <div className="socialLinks">
        <div className="linkdin">
          <SocialIcon
            url="https://linkedin.com/in/paras-pandey-b938b3183/"
            targer="_blank"
          />
        </div>
        <div className="github">
          <SocialIcon url="https://github.com/ParasPandey" targer="_blank" />
        </div>
        <div className="insta">
          <SocialIcon
            url="https://www.instagram.com/ig_paras_31/"
            targer="_blank"
          />
        </div>
      </div>
      <div className="copyright">
        <p>
          Copyright<span className="copy">©</span>{" "}
          <span className="name">Paras Pandey</span>{" "}
          <span className="year">{date.getFullYear()}</span>
        </p>
      </div>
    </div>
  );
};
