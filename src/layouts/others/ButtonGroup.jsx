/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "../../styles/others/Layout.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function BasicButtonGroup({
  firstMaterial,
  secondMaterial,
  thirdMaterial,
  firstUsage,
  secondUsage,
  thirdUsage,
}) {
  useEffect(() => {
    const buttons = document.querySelectorAll("#button-group button");

    function handleClick() {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
    }

    buttons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <ButtonGroup
      variant="contained"
      aria-label="Basic button group"
      id="button-group"
    >
      <div className="product-">
        <Button>{firstMaterial}</Button>
        <Button>{secondMaterial}</Button>
        <Button>{thirdMaterial}</Button>
      </div>
      {firstUsage && (
        <div className="product-">
          <Button>{firstUsage}</Button>
          <Button>{secondUsage}</Button>
          <Button>{thirdUsage}</Button>
        </div>
      )}
    </ButtonGroup>
  );
}
