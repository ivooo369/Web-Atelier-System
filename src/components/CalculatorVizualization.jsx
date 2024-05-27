/* eslint-disable react/prop-types */
export default function CalculatorVizualization({
  containerWidth,
  containerHeight,
  selectedInnerFrameName,
  selectedOuterFrameName,
  selectedInnerFrameImage,
  selectedOuterFrameImage,
  selectedMatboardName,
  selectedMatboardImage,
  selectedFrameWidth,
  selectedFrameHeight,
  previewImage,
  selectedMatboardWidth,
  handleFullScreen,
}) {
  return (
    <div
      className="calculator-products-images-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        marginBottom: "3rem",
      }}
    >
      {selectedInnerFrameName ? (
        <div
          className="frame-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() =>
            handleFullScreen(document.querySelector(".frame-wrapper"))
          }
        >
          {selectedOuterFrameName ? (
            <>
              <img
                src={selectedOuterFrameImage}
                alt={`${selectedOuterFrameName}`}
                className="outer-frame-image"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 3,
                }}
              />
              <img
                src={selectedInnerFrameImage}
                alt={`${selectedInnerFrameName}`}
                className="inner-frame-image"
                style={{
                  width: "96%",
                  height: "94%",
                  position: "absolute",
                  top: "3%",
                  left: "2%",
                  zIndex: 3,
                }}
              />
              {selectedMatboardName && (
                <img
                  src={selectedMatboardImage}
                  alt={`${selectedMatboardName}`}
                  className="matboard-image"
                  style={{
                    width: "91%",
                    height: "88%",
                    position: "absolute",
                    left: "4.5%",
                    zIndex: 3,
                  }}
                />
              )}
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="preview-image"
                  style={{
                    width: `${
                      selectedMatboardName
                        ? 91 -
                          (selectedMatboardWidth / selectedFrameWidth) * 100
                        : 91
                    }%`,
                    height: `${
                      selectedMatboardName
                        ? 88 -
                          (selectedMatboardWidth / selectedFrameHeight) * 100
                        : 88
                    }%`,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                  }}
                />
              ) : (
                <div
                  className="preview-placeholder"
                  style={{
                    width: `${
                      selectedMatboardName
                        ? 91 -
                          (selectedMatboardWidth / selectedFrameWidth) * 100
                        : 91
                    }%`,
                    height: `${
                      selectedMatboardName
                        ? 88 -
                          (selectedMatboardWidth / selectedFrameHeight) * 100
                        : 88
                    }%`,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                    backgroundColor: "white",
                  }}
                ></div>
              )}
            </>
          ) : (
            <>
              <img
                src={selectedInnerFrameImage}
                alt={`${selectedInnerFrameName}`}
                className="inner-frame-image"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  zIndex: 3,
                }}
              />
              {selectedMatboardName && (
                <img
                  src={selectedMatboardImage}
                  alt={`${selectedMatboardName}`}
                  className="matboard-image"
                  style={{
                    width: "95%",
                    height: "94%",
                    position: "absolute",
                    top: "3%",
                    left: "2.5%",
                    zIndex: 3,
                  }}
                />
              )}
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="preview-image"
                  style={{
                    width: `${
                      selectedMatboardName
                        ? 95 -
                          (selectedMatboardWidth / selectedFrameWidth) * 100
                        : 95
                    }%`,
                    height: `${
                      selectedMatboardName
                        ? 94 -
                          (selectedMatboardWidth / selectedFrameHeight) * 100
                        : 94
                    }%`,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                  }}
                />
              ) : (
                <div
                  className="preview-placeholder"
                  style={{
                    width: `${
                      selectedMatboardName
                        ? 95 -
                          (selectedMatboardWidth / selectedFrameWidth) * 100
                        : 95
                    }%`,
                    height: `${
                      selectedMatboardName
                        ? 94 -
                          (selectedMatboardWidth / selectedFrameHeight) * 100
                        : 94
                    }%`,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                    backgroundColor: "white",
                  }}
                ></div>
              )}
            </>
          )}
        </div>
      ) : (
        <div
          className="select-inner-frame-message"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            border: "3px dashed #ccc",
            textAlign: "center",
            fontSize: "1.5rem",
            color: "#999",
          }}
        >
          Моля, първо изберете вътрешна рамка!
        </div>
      )}
    </div>
  );
}
