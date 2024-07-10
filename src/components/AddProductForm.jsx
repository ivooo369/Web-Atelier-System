/* eslint-disable react/prop-types */
import "../styles/dashboard/ProductsDashboard.css";
import { useState, useEffect, useRef } from "react";
import { TextField, Button, Box } from "@mui/material";
import BasicSelect from "../layouts/others/Select";
import {
  productFormCategories,
  frameUsageFormOptions,
  profileUsageFormOptions,
  gobelinTypesFormOptions,
} from "../utils/selectOptions";
import { requiredFieldsByCategory } from "../utils/requiredFields";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AddProductForm({ onProductsUpdate }) {
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productPrice: "",
    productMaterial: "",
    productType: "",
    productDescription: "",
    productImage: "",
    productWidth: "",
    productHeight: "",
    productReleaseDate: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (
      formData.productCategory === "Рамки" ||
      formData.productCategory === "Профили"
    ) {
      setMaterialOptions(["Полистирен", "Дърво", "Алуминий"]);
    } else if (formData.productCategory === "Паспарту") {
      setMaterialOptions(["Картон", "Полистирен", "Дърво"]);
    } else {
      setMaterialOptions([]);
    }
  }, [formData.productCategory]);

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

  const handleChange = (field, value) => {
    if (field === "productImage") {
      const file = value;
      setFormData({ ...formData, [field]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (field === "productName" && value.length > 30) {
      setFormData({ ...formData, [field]: value.slice(0, 30) });
    } else if (typeof value === "object") {
      setFormData({ ...formData, [field]: value.target.value });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!formData.productCategory) {
      setNotification({
        message: "Please select a product category!",
        type: "error",
      });
      return;
    }

    const requiredFields = requiredFieldsByCategory[formData.productCategory];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      const errorMessage =
        "Please fill in all required fields and upload a product image!";
      setNotification({ message: errorMessage, type: "error" });
      return;
    }

    const formDataWithImage = new FormData();
    if (formData.productImage) {
      formDataWithImage.append("image", formData.productImage);
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "productImage") {
        formDataWithImage.append(key, value);
      }
    });

    fetch(`${apiUrl}/admin/dashboard/products`, {
      method: "POST",
      body: formDataWithImage,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setNotification({
          message: "Продуктът е добавен успешно!",
          type: "success",
        });
        clearForm();
        onProductsUpdate();
      })
      .catch((error) => {
        console.error("Error:", error);
        setNotification({ message: error.message, type: "error" });
      });
  };

  const clearForm = () => {
    setFormData({
      productName: "",
      productCategory: "",
      productPrice: "",
      productMaterial: "",
      productType: "",
      productDescription: "",
      productImage: null,
      productWidth: "",
      productHeight: "",
      productReleaseDate: "",
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, productImage: null });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formFields = [
    {
      label: "Категория",
      field: "productCategory",
      type: "select",
      menuItems: productFormCategories,
    },
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
  ].filter((field) => {
    if (formData.productCategory === "Арт материали") {
      return field.field !== "productWidth" && field.field !== "productHeight";
    } else if (formData.productCategory === "") {
      return true;
    } else {
      return true;
    }
  });

  return (
    <form
      className="product-forms add-product-form"
      onSubmit={handleAddProduct}
    >
      <h2 className="products-dashboard-titles">Добавяне на нов продукт</h2>
      <Box>
        {formFields.map((field, index) => {
          if (field.disabled) {
            return null;
          }
          return (
            <Box key={index} mb={2}>
              {!field.hidden && (
                <FormField
                  {...field}
                  value={formData[field.field]}
                  handleChange={(value) => handleChange(field.field, value)}
                  fileInputRef={field.type === "file" ? fileInputRef : null}
                />
              )}
            </Box>
          );
        })}
      </Box>
      {imagePreview && (
        <Box mt={2} mb={2} id="dashboard-image-preview-container">
          <img
            src={imagePreview}
            alt="Product Preview"
            className="dashboard-preview-image"
          />
          <Button
            variant="outlined"
            onClick={removeImage}
            id="dashboard-remove-preview-image-button"
          >
            <span className="material-symbols-outlined">delete</span>
          </Button>
        </Box>
      )}
      <Button variant="contained" id="add-product-button" type="submit">
        Добави нов продукт
      </Button>
      {notification.message && (
        <div
          className={`notification-messages ${
            notification.type === "success"
              ? "success-messages"
              : "error-messages"
          }`}
        >
          {notification.message}
        </div>
      )}
    </form>
  );
}

function FormField({
  label,
  field,
  type,
  menuItems,
  value = "",
  handleChange,
  fileInputRef,
}) {
  if (type === "select") {
    return (
      <BasicSelect
        label={label}
        labelId={`${field}-label`}
        menuItems={menuItems}
        value={value}
        handleChange={handleChange}
        fullWidth
      />
    );
  } else if (type === "textarea") {
    return (
      <TextField
        label={label}
        multiline
        rows={3}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
      />
    );
  } else if (type === "file") {
    return (
      <Box>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e.target.files[0])}
          style={{ display: "none" }}
          id="upload-button"
          ref={fileInputRef}
        />
        <label htmlFor="upload-button">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            sx={{ textTransform: "none", height: "100%" }}
          >
            {value && value.name ? value.name : "Качете изображение"}
          </Button>
        </label>
      </Box>
    );
  } else {
    return (
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
      />
    );
  }
}
