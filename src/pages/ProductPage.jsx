import { useParams } from "react-router-dom";
import {
  productsMenuItems,
  productsMenuIcons,
  productsMenuRoutes,
} from "../utils/menuData";
import BasicButtonGroup from "../layouts/others/ButtonGroup";

export default function ProductPage() {
  const { productName } = useParams();
  return (
    <>
      <header className="page-header">
        <span className="material-symbols-outlined">
          {productsMenuIcons[productsMenuRoutes.indexOf(productName)]}
        </span>
        <h1>{productsMenuItems[productsMenuRoutes.indexOf(productName)]}</h1>
      </header>
      {productsMenuItems[productsMenuRoutes.indexOf(productName)] ===
        "Рамки" && (
        <div className="filter-buttons">
          <BasicButtonGroup
            firstMaterial="Рамки от полистирен"
            secondMaterial="Рамки от дърво"
            thirdMaterial="Рамки от алуминий"
            firstUsage="Рамки за картини"
            secondUsage="Рамки за гоблени"
            thirdUsage="Рамки за снимки"
          />
        </div>
      )}
      {productsMenuItems[productsMenuRoutes.indexOf(productName)] ===
        "Профили" && (
        <div className="filter-buttons">
          <BasicButtonGroup
            firstMaterial="Профили от полистирен"
            secondMaterial="Профили от дърво"
            thirdMaterial="Профили от алуминий"
            firstUsage="Профили за подрамки"
            secondUsage="Профили за мебели"
            thirdUsage="Профили за интериор"
          />
        </div>
      )}
      {productsMenuItems[productsMenuRoutes.indexOf(productName)] ===
        "Паспарту" && (
        <div className="filter-buttons">
          <BasicButtonGroup
            firstMaterial="Паспарту от картон"
            secondMaterial="Паспарту от дърво"
            thirdMaterial="Паспарту от полистирен"
          />
        </div>
      )}
    </>
  );
}
