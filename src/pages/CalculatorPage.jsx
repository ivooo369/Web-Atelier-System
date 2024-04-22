import { useState } from "react";
import FramesAccordion from "../layouts/accordions/FramesAccordion";
import InputAccordion from "../layouts/accordions/InputAccordion";
import MatboardsAccordion from "../layouts/accordions/MatboardsAccordion";
import CheckboxAccordion from "../layouts/accordions/CheckboxAccordion";
import SizesAccordion from "../layouts/accordions/SizesAccordion";
import PriceAccordion from "../layouts/accordions/PriceAccordion";
import { glassMenuItems, hangingOptionMenuItems } from "../utils/selectOptions";
import { ChromePicker } from "react-color";

export default function CalculatorPage() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [expanded, setExpanded] = useState(false);
  const [glass, setGlass] = useState("");
  const [hangingOption, setHangingOption] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleGlassChange = (event) => {
    setGlass(event.target.value);
  };

  const handleHangingOptionChange = (event) => {
    setHangingOption(event.target.value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleColorChange = (color) => {
    setBgColor(color.hex);
  };

  const handleColorPickerToggle = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="calculator-page" style={{ backgroundColor: bgColor }}>
      <div className="frame-container">
        <div className="bg-color-and-image-choice-container">
          <div className="button-wrapper">
            <button
              className="color-input-button"
              onClick={handleColorPickerToggle}
            >
              Цвят на фона
            </button>
            {showColorPicker && (
              <div className="color-picker-container">
                <ChromePicker
                  color={bgColor}
                  onChange={handleColorChange}
                  disableAlpha={true}
                />
              </div>
            )}
          </div>
          <div className="image-choice-container">
            {previewImage ? (
              <img
                src={previewImage}
                alt=""
                className="frame"
                style={{ width: "7rem", height: "7rem" }}
              />
            ) : (
              <span className="material-symbols-outlined preview-image">
                imagesmode
              </span>
            )}
            <div className="file-input-container">
              <h5>Качете снимка, за да видите как ще стои в рамката:</h5>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="panel-headers">
        <SizesAccordion
          expanded={expanded === "sizes"}
          handleChange={handleChange("sizes")}
        />
        <FramesAccordion
          title="Рамка №1"
          text="Рамка, която се поставя непосредствено до картината"
          id="frame-1"
          expanded={expanded}
          handleChange={handleChange}
        />
        <FramesAccordion
          title="Рамка №2"
          text="Рамка, която се поставя върху рамка №1"
          id="frame-2"
          expanded={expanded}
          handleChange={handleChange}
        />
        <MatboardsAccordion expanded={expanded} handleChange={handleChange} />
        <InputAccordion
          title="Стъкло"
          id="glass"
          expanded={expanded}
          handleChange={handleChange}
          selectLabel="Стъкло"
          selectMenuItems={glassMenuItems}
          selectValue={glass}
          selectOnChange={handleGlassChange}
          showSelect={true}
        />
        <CheckboxAccordion
          title="Огледало"
          id="mirror"
          expanded={expanded}
          handleChange={handleChange}
          checkboxId="mirror-checkbox"
          checkboxTitle="Огледало"
        />
        <CheckboxAccordion
          title="Гръб"
          id="back"
          expanded={expanded}
          handleChange={handleChange}
          checkboxId="back-checkbox"
          checkboxTitle="Гръб"
        />
        <InputAccordion
          title="Окачване"
          id="hanging"
          expanded={expanded}
          handleChange={handleChange}
          selectLabel="Окачване"
          selectMenuItems={hangingOptionMenuItems}
          selectValue={hangingOption}
          selectOnChange={handleHangingOptionChange}
          showSelect={true}
        />
        <CheckboxAccordion
          title="Опъване на гоблен"
          id="gobelin-stretching"
          expanded={expanded}
          handleChange={handleChange}
          checkboxId="gobelin-stretching-checkbox"
          checkboxTitle="Опъване на гоблен"
        />
        <CheckboxAccordion
          title="Подрамка"
          id="subframe"
          expanded={expanded}
          handleChange={handleChange}
          checkboxId="subframe-checkbox"
          checkboxTitle="Подрамка"
        />
        <InputAccordion
          title="Брой рамки"
          id="number-of-frames"
          expanded={expanded}
          handleChange={handleChange}
          selectLabel="Брой рамки"
          selectMenuItems={[]}
          showSelect={false}
        />
        <PriceAccordion expanded={expanded} handleChange={handleChange} />
      </div>
    </div>
  );
}
