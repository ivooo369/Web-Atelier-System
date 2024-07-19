/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FramesAccordion from "../../layouts/accordions/FramesAccordion";
import InputAccordion from "../../layouts/accordions/InputAccordion";
import SelectAccordion from "../../layouts/accordions/SelectAccordion";
import MatboardsAccordion from "../../layouts/accordions/MatboardsAccordion";
import CheckboxAccordion from "../../layouts/accordions/CheckboxAccordion";
import SizesAccordion from "../../layouts/accordions/SizesAccordion";
import PriceAccordion from "../../layouts/accordions/PriceAccordion";
import CalculatorVizualization from "../../components/CalculatorVizualization";
import { hangingOptionMenuItems } from "../../utils/selectOptions";
import { ChromePicker } from "react-color";

export default function CalculatorPage() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [expanded, setExpanded] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedInnerFrameName, setSelectedInnerFrameName] = useState("");
  const [selectedOuterFrameName, setSelectedOuterFrameName] = useState("");
  const [selectedInnerFrameImage, setSelectedInnerFrameImage] = useState(null);
  const [selectedOuterFrameImage, setSelectedOuterFrameImage] = useState(null);
  const [selectedFrameWidth, setSelectedFrameWidth] = useState(15);
  const [selectedFrameHeight, setSelectedFrameHeight] = useState(10);
  const [isInnerFrameSelected, setIsInnerFrameSelected] = useState(false);
  const [selectedNumberOfFrames, setSelectedNumberOfFrames] = useState(0);
  const [selectedMatboardName, setSelectedMatboard] = useState("");
  const [selectedMatboardImage, setSelectedMatboardImage] = useState(null);
  const [selectedMatboardWidth, setSelectedMatboardWidth] = useState(1);
  const [selectedGlass, setSelectedGlass] = useState("");
  const [selectedHangingOption, setSelectedHangingOption] = useState("");
  const [selectedMirror, setSelectedMirror] = useState(false);
  const [selectedBack, setSelectedBack] = useState(false);
  const [selectedGobelinStretching, setselectedGobelinStretching] =
    useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [containerWidth, setContainerWidth] = useState(750);
  const [containerHeight, setContainerHeight] = useState(500);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const frameName = queryParams.get("frameName");
    const frameImagePath = queryParams.get("framePath");
    if (frameImagePath) {
      setSelectedInnerFrameName(frameName);
      setSelectedInnerFrameImage(`/${frameImagePath}`);
    }
  }, [location.search]);

  const handleFrameSelect = (frameName, isInnerFrame) => {
    if (isInnerFrame) {
      setSelectedInnerFrameName(frameName);
    } else {
      setSelectedOuterFrameName(frameName);
    }
  };

  useEffect(() => {
    const aspectRatio = selectedFrameWidth / selectedFrameHeight;
    const maxContainerWidth = 750;
    const maxContainerHeight = 600;

    let newContainerWidth = maxContainerWidth;
    let newContainerHeight = newContainerWidth / aspectRatio;

    if (newContainerHeight > maxContainerHeight) {
      newContainerHeight = maxContainerHeight;
      newContainerWidth = newContainerHeight * aspectRatio;
    }

    setContainerWidth(newContainerWidth);
    setContainerHeight(newContainerHeight);
  }, [selectedFrameWidth, selectedFrameHeight]);

  const handleMatboardSelect = (matboardName) => {
    setSelectedMatboard(matboardName);
  };

  const handleCheckboxChange = (checked) => {
    setSelectedCheckbox(checked);
  };

  const handleFrameSizes = (width, height) => {
    setSelectedFrameWidth(width);
    setSelectedFrameHeight(height);
  };

  const handleNumberOfFrames = (numberOfFrames) => {
    setSelectedNumberOfFrames(numberOfFrames);
  };

  const handleMatboardWidth = (width) => {
    setSelectedMatboardWidth(width);
  };

  const handleHangingOptionChange = (event) => {
    if (event && event.target && event.target.value) {
      const value = event.target.value;
      setSelectedHangingOption(value);
    } else {
      console.error("Възникна грешка със събитието:", event);
    }
  };

  const handleExpansionChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded && expanded === panel ? false : panel);
  };

  const handleColorChange = (color) => {
    setBgColor(color.hex);
  };

  const handleColorPickerToggle = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
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

  const handleRemovePreviewImage = () => {
    setPreviewImage(null);
    const fileInput = document.querySelector(".file-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="calculator-page pages" style={{ backgroundColor: bgColor }}>
      <div className="frame-container">
        <CalculatorVizualization
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          selectedInnerFrameName={selectedInnerFrameName}
          selectedOuterFrameName={selectedOuterFrameName}
          selectedInnerFrameImage={selectedInnerFrameImage}
          selectedOuterFrameImage={selectedOuterFrameImage}
          selectedMatboardName={selectedMatboardName}
          selectedMatboardImage={selectedMatboardImage}
          selectedFrameWidth={selectedFrameWidth}
          selectedFrameHeight={selectedFrameHeight}
          previewImage={previewImage}
          selectedMatboardWidth={selectedMatboardWidth}
        />
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
                className="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
              {previewImage && (
                <button
                  className="remove-preview-image-button"
                  onClick={handleRemovePreviewImage}
                >
                  <span className="material-symbols-outlined">delete</span>{" "}
                  Премахнете изображението
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="panel-headers">
        <SizesAccordion
          expanded={expanded === "sizes"}
          handleExpansionChange={handleExpansionChange("sizes")}
          handleFrameSizes={handleFrameSizes}
        />
        <FramesAccordion
          title="Вътрешна рамка"
          id="inner-frame"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          text="Рамка, която се поставя непосредствено до картината"
          onSelectFrameImage={(image) => {
            setSelectedInnerFrameImage(image);
            setIsInnerFrameSelected(true);
          }}
          // framesCategory="Рамки"
          onSelectFrame={(frameName) => handleFrameSelect(frameName, true)}
          isInnerFrameSelected={isInnerFrameSelected}
        />
        <FramesAccordion
          title="Външна рамка"
          id="outer-frame"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          text="Рамка, която се поставя върху вътрешната рамка"
          onSelectFrameImage={(image) => {
            setSelectedOuterFrameImage(image);
            setIsInnerFrameSelected(false);
          }}
          // framesCategory="Рамки"
          onSelectFrame={(frameName) => handleFrameSelect(frameName, false)}
          isInnerFrameSelected={selectedInnerFrameName}
        />
        <MatboardsAccordion
          title="Паспарту"
          text="Паспартуто се поставя между картината и вътрешната рамка"
          handleMatboardWidth={handleMatboardWidth}
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          onSelectMatboard={(matboardName) =>
            handleMatboardSelect(matboardName)
          }
          onSelectMatboardImage={(image) => {
            setSelectedMatboardImage(image);
          }}
          frameWidth={selectedFrameWidth}
          frameHeight={selectedFrameHeight}
          isInnerFrameSelected={selectedInnerFrameName}
          // category="Паспарту"
        />
        <CheckboxAccordion
          title="Стъкло"
          id="glass"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          checkboxId="glass-checkbox"
          checkboxTitle="Стъкло"
          onSelect={(selected) => setSelectedGlass(selected)}
        />
        <CheckboxAccordion
          title="Огледало"
          id="mirror"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          checkboxId="mirror-checkbox"
          checkboxTitle="Огледало"
          onSelect={(selected) => setSelectedMirror(selected)}
        />
        <CheckboxAccordion
          title="Гръб"
          id="back"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          checkboxId="back-checkbox"
          checkboxTitle="Гръб"
          onSelect={(selected) => setSelectedBack(selected)}
        />
        <SelectAccordion
          title="Окачване"
          id="hanging"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          selectLabel="Окачване"
          selectMenuItems={hangingOptionMenuItems}
          selectValue={selectedHangingOption}
          selectOnChange={handleHangingOptionChange}
          showSelect={true}
        />
        <CheckboxAccordion
          title="Опъване на гоблен"
          id="gobelin-stretching"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          checkboxId="gobelin-stretching-checkbox"
          checkboxTitle="Опъване на гоблен"
          onSelect={(selected) => setselectedGobelinStretching(selected)}
        />
        <CheckboxAccordion
          title="Подрамка"
          id="subframe"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          checkboxId="subframe-checkbox"
          checkboxTitle="Подрамка"
          onSelect={handleCheckboxChange}
        />
        <InputAccordion
          title="Брой рамки"
          id="number-of-frames"
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          selectLabel="Брой рамки"
          selectMenuItems={[]}
          showSelect={false}
          handleNumberOfFramesInput={handleNumberOfFrames}
        />
        <PriceAccordion
          expanded={expanded}
          handleExpansionChange={handleExpansionChange}
          selectedInnerFrameName={selectedInnerFrameName}
          selectedOuterFrameName={selectedOuterFrameName}
          selectedMatboardName={selectedMatboardName}
          selectedMatboardWidth={selectedMatboardWidth}
          selectedGlass={selectedGlass}
          selectedMirror={selectedMirror}
          selectedBack={selectedBack}
          selectedGobelinStretching={selectedGobelinStretching}
          selectedSubframe={selectedCheckbox}
          selectedHangingOption={selectedHangingOption}
          selectedNumberOfFrames={selectedNumberOfFrames}
          selectedFrameWidth={selectedFrameWidth}
          selectedFrameHeight={selectedFrameHeight}
        />
      </div>
    </div>
  );
}
