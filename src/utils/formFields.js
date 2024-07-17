import {
  productFormCategories,
  frameUsageFormOptions,
  profileUsageFormOptions,
  gobelinTypesFormOptions,
} from "./selectOptions";

const getTypeOptions = (category) => {
  switch (category) {
    case "Рамки":
      return frameUsageFormOptions;
    case "Профили":
      return profileUsageFormOptions;
    case "Гоблени":
      return gobelinTypesFormOptions;
    default:
      return [];
  }
};

export const getFormFields = (
  formData,
  materialOptions,
  functionOfTheComponent
) => {
  let fields = [
    { label: "Наименование", field: "productName", type: "text" },
    {
      label: "Материал",
      field: "productMaterial",
      type: "select",
      menuItems: materialOptions.map((option) => ({
        value: option,
        label: option,
      })),
      disabled:
        formData.productCategory === "" ||
        ["Рамки", "Профили", "Паспарту"].includes(formData.productCategory)
          ? false
          : true,
    },
    {
      label: formData.productCategory === "Гоблени" ? "Вид" : "Предназначение",
      field: "productType",
      type: "select",
      menuItems: getTypeOptions(formData.productCategory),
      disabled:
        formData.productCategory === ""
          ? false
          : !["Рамки", "Профили", "Гоблени"].includes(formData.productCategory),
    },
    {
      label: "Ширина (мм)",
      field: "productWidth",
      type: "number",
    },
    {
      label: "Височина (мм)",
      field: "productHeight",
      type: "number",
    },
    {
      label:
        "Цена " +
        (formData.productCategory === "Рамки"
          ? "за труд (лв.)"
          : formData.productCategory === "Профили"
          ? "(лв./м)"
          : formData.productCategory === "Паспарту"
          ? "(лв./бр.)"
          : "(лв.)"),

      field: "productPrice",
      type: "number",
    },
    { label: "Описание", field: "productDescription", type: "textarea" },
    { label: "Изображение", field: "productImage", type: "file" },
  ];

  if (functionOfTheComponent === "add") {
    fields = [
      {
        label: "Категория",
        field: "productCategory",
        type: "select",
        menuItems: productFormCategories,
      },
      ...fields,
    ];
  }

  fields = fields.filter((field) => {
    if (formData.productCategory === "Арт материали") {
      return field.field !== "productWidth" && field.field !== "productHeight";
    } else if (formData.productCategory === "") {
      return true;
    } else {
      return true;
    }
  });

  return fields;
};
