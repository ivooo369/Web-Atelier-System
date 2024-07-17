/* eslint-disable react/prop-types */
import "../styles/dashboard/ProductsDashboard.css";
import { useState, useEffect, useRef } from "react";
import { Button, Box } from "@mui/material";
import FormField from "../layouts/others/FormField";
import { requiredFieldsByCategory } from "../utils/requiredFields";
import { getFormFields } from "../utils/formFields";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const functionOfTheComponent = "add";

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

  const fields = getFormFields(
    formData,
    materialOptions,
    functionOfTheComponent
  );

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
        message: "Моля, изберете категория на продукта!",
        type: "error",
      });
      return;
    }

    const requiredFields = requiredFieldsByCategory[formData.productCategory];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      const errorMessage =
        "Моля, попълнете всички задължителни полета и качете снимка на продукта!";
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

    axios
      .post(`${apiUrl}/admin/dashboard/products`, formDataWithImage)
      .then(() => {
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

  return (
    <form
      className="product-forms add-product-form"
      onSubmit={handleAddProduct}
    >
      <h2 className="products-dashboard-titles">Добавяне на нов продукт</h2>
      <Box>
        {fields.map((field, index) => {
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
                  functionOfTheComponent={functionOfTheComponent}
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
