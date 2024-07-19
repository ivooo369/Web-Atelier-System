/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  fetchPrices,
  calculateSinglePrice,
  calculateFinalPriceWithQuantity,
} from "../../utils/priceCalculations";

export default function PriceAccordion({
  expanded,
  handleExpansionChange,
  selectedInnerFrameName,
  selectedOuterFrameName,
  selectedGlass,
  selectedHangingOption,
  selectedMatboardName,
  selectedMatboardWidth,
  selectedMirror,
  selectedBack,
  selectedGobelinStretching,
  selectedSubframe,
  selectedNumberOfFrames,
  selectedFrameWidth,
  selectedFrameHeight,
}) {
  const [singlePrice, setSinglePrice] = useState(0);
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    const updatePrice = async () => {
      const innderFrame = await fetchPrices(selectedInnerFrameName);
      const outerFrame = selectedOuterFrameName
        ? await fetchPrices(selectedOuterFrameName)
        : { profilePricePerMeter: 0, laborPrice: 0 };

      const frameWidth = selectedFrameWidth
        ? parseFloat(selectedFrameWidth)
        : 15;
      const frameHeight = selectedFrameHeight
        ? parseFloat(selectedFrameHeight)
        : 10;
      const matboardWidth = selectedMatboardWidth
        ? parseFloat(selectedMatboardWidth)
        : 0;

      const price = calculateSinglePrice(
        innderFrame.profilePricePerMeter,
        innderFrame.laborPrice,
        outerFrame.profilePricePerMeter,
        outerFrame.laborPrice,
        frameWidth,
        frameHeight,
        selectedSubframe,
        selectedGobelinStretching,
        selectedHangingOption,
        selectedBack,
        selectedGlass,
        selectedMirror,
        selectedMatboardName,
        matboardWidth
      );
      setSinglePrice(price);
    };

    if (selectedInnerFrameName) {
      updatePrice();
    }
  }, [
    selectedInnerFrameName,
    selectedOuterFrameName,
    selectedFrameWidth,
    selectedFrameHeight,
    selectedSubframe,
    selectedGobelinStretching,
    selectedHangingOption,
    selectedBack,
    selectedGlass,
    selectedMirror,
    selectedMatboardName,
    selectedMatboardWidth,
  ]);

  const handleAddToCart = () => {
    clearTimeout(timerRef.current);
    if (selectedInnerFrameName) {
      const frameWidth = selectedFrameWidth ? selectedFrameWidth : 24;
      const frameHeight = selectedFrameHeight ? selectedFrameHeight : 18;
      const matboardWidth = selectedMatboardWidth
        ? selectedMatboardWidth
        : "не";
      const framesQuantity = selectedNumberOfFrames
        ? selectedNumberOfFrames
        : 1;

      const cartData = {
        innerFrame: selectedInnerFrameName,
        outerFrame: selectedOuterFrameName,
        frameWidth: frameWidth,
        frameHeight: frameHeight,
        matboard: selectedMatboardName,
        matboardWidth: matboardWidth,
        glassOption: selectedGlass ? "да" : "не",
        mirrorOption: selectedMirror ? "да" : "не",
        backingOption: selectedBack ? "да" : "не",
        hangingOption: selectedHangingOption || "не",
        gobelinStretching: selectedGobelinStretching ? "да" : "не",
        subframeOption: selectedSubframe ? "да" : "не",
        framesQuantity: framesQuantity,
        price: parseFloat(singlePrice).toFixed(2),
      };

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartData);
      localStorage.setItem("cart", JSON.stringify(cart));
      setMessage("Успешно добавяне в количката!");
      timerRef.current = setTimeout(() => {
        setMessage("");
        navigateTo("/calculator/cart");
      }, 1000);
    } else {
      timerRef.current = setTimeout(() => {
        setMessage("");
      }, 3000);
      setMessage(
        "Моля, изберете вътрешна рамка преди да добавите в количката!"
      );
    }
  };

  const framesQuantity = selectedNumberOfFrames ? selectedNumberOfFrames : 1;
  const finalPrice = calculateFinalPriceWithQuantity(
    singlePrice,
    framesQuantity
  );
  const finalPriceFormatted = finalPrice.toFixed(2);

  return (
    <Accordion
      expanded={expanded === "price"}
      onChange={handleExpansionChange("price")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="price-content"
        className="accordion-headers"
      >
        <p className="accordion-titles">Цена</p>
      </AccordionSummary>
      <AccordionDetails>
        <h3 className="panel-content-titles">Крайна цена</h3>
        <div className="details-container-grid">
          <div className="information-column">
            <p>
              Вътрешна рамка: <b>{selectedInnerFrameName || "не"}</b>
            </p>
            <p>
              Външна рамка: <b>{selectedOuterFrameName || "не"}</b>
            </p>
            <p>
              Ширина: <b>{selectedFrameWidth || 15} см</b>
            </p>
            <p>
              Височина: <b>{selectedFrameHeight || 10} см</b>
            </p>
            <p>
              Стъкло: <b>{selectedGlass ? "да" : "не"}</b>
            </p>
            <p>
              Окачване: <b>{selectedHangingOption || "не"}</b>
            </p>
            <p>
              Паспарту: <b>{selectedMatboardName || "не"}</b>
            </p>
            <p>
              Паспарту (широчина):{" "}
              <b>
                {selectedMatboardName && selectedMatboardWidth
                  ? selectedMatboardWidth
                  : 0}{" "}
                см
              </b>
            </p>
          </div>
          <div className="information-column">
            <p>
              Огледало: <b>{selectedMirror ? "да" : "не"}</b>
            </p>
            <p>
              Гръб: <b>{selectedBack ? "да" : "не"}</b>
            </p>
            <p>
              Опъване на гоблен:{" "}
              <b>{selectedGobelinStretching ? "да" : "не"}</b>
            </p>
            <p>
              Подрамка: <b>{selectedSubframe ? "да" : "не"}</b>
            </p>
            <p>
              Брой рамки: <b>{framesQuantity}</b>
            </p>
            <p>
              Единична цена: <b>{parseFloat(singlePrice).toFixed(2)} лв.</b>
            </p>
            <p className="total-price-text">
              <b>Крайна цена: </b>
              <b className="total-price-value">{finalPriceFormatted} лв.</b>
            </p>
          </div>
        </div>
        <Button
          variant="contained"
          id="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Добави в количка
        </Button>
        {message && (
          <p
            className={`notification-messages ${
              message === "Успешно добавяне в количката!"
                ? "success-messages"
                : "error-messages"
            }`}
          >
            {message}
          </p>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
