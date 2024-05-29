/* eslint-disable react/prop-types */
import "../../styles/dashboard/ProductsDashboard.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import BasicSelect from "../../layouts/others/Select";
import { useParams, useNavigate } from "react-router-dom";
import {
  frameUsageFormOptions,
  profileUsageFormOptions,
  gobelinTypesFormOptions,
} from "../../utils/selectOptions";

export default function EditProductPage() {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [existingProducts, setExistingProducts] = useState([]);
  const [originalProductName, setOriginalProductName] = useState("");
  const fileInputRef = useRef(null);

  const { productId } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://website-project-lbpd.onrender.com/admin/dashboard/products/edit/${productId}`
        );
        const {
          product_name,
          product_category,
          product_price,
          product_material,
          product_type,
          product_description,
          product_width,
          product_height,
          product_image_path,
        } = response.data;

        setFormData({
          productName: product_name || "",
          productCategory: product_category || "",
          productPrice: product_price || "",
          productMaterial: product_material || "",
          productType: product_type || "",
          productDescription: product_description || "",
          productWidth: product_width || "",
          productHeight: product_height || "",
          productImage: product_image_path || "",
        });

        setOriginalProductName(product_name || "");

        if (product_image_path) {
          setImagePreview(`/backend/${product_image_path}`);
        }

        const productsResponse = await axios.get(
          `https://website-project-lbpd.onrender.com/admin/dashboard/products?category=${product_category}`
        );
        const existingProductsData = productsResponse.data.map((product) => ({
          productName: product.product_name,
          productId: product.product_id,
        }));
        setExistingProducts(existingProductsData);
      } catch (error) {
        console.error("Грешка при извличане на продукта:", error);
        setNotification({
          message: "Грешка при зареждане на продукта за редактиране!",
          type: "error",
        });
      }
    };

    fetchProduct();
  }, [productId]);

  const removeImage = () => {
    setFormData({ ...formData, productImage: null });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

  useEffect(() => {
    let hideNotificationTimer;
    if (notification.type === "error") {
      hideNotificationTimer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
    }

    return () => {
      clearTimeout(hideNotificationTimer);
    };
  }, [notification]);

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
      if (file) {
        reader.readAsDataURL(file);
      }
    } else if (field === "productName" && value.length > 30) {
      setFormData({ ...formData, [field]: value.slice(0, 30) });
    } else if (typeof value === "object") {
      setFormData({ ...formData, [field]: value.target.value });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "productName",
      "productCategory",
      "productDescription",
      "productImage",
    ];
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldEmpty) {
      setNotification({
        message:
          "Моля, попълнете всички полета и качете изображение за продукта!",
        type: "error",
      });
      return;
    }

    if (originalProductName !== formData.productName) {
      const isExistingProduct = existingProducts.some(
        (product) =>
          product.productName === formData.productName &&
          product.productId !== productId
      );

      if (isExistingProduct) {
        setNotification({
          message: "Вече съществува продукт със същото име и категория!",
          type: "error",
        });
        return;
      }
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("productCategory", formData.productCategory);
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productMaterial", formData.productMaterial);
      formDataToSend.append("productType", formData.productType);
      formDataToSend.append("productWidth", formData.productWidth);
      formDataToSend.append("productHeight", formData.productHeight);
      formDataToSend.append("productPrice", formData.productPrice);
      formDataToSend.append("productDescription", formData.productDescription);
      formDataToSend.append("productImage", formData.productImage);

      const response = await axios.put(
        `https://website-project-lbpd.onrender.com/admin/dashboard/products/edit/${productId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setNotification({
          message: "Продуктът е успешно редактиран!",
          type: "success",
        });
        setTimeout(() => {
          navigateTo("/admin/dashboard/products");
        }, 3000);
      } else {
        throw new Error("Неуспешно редактиране на продукта!");
      }
    } catch (error) {
      console.error("Грешка при редактиране на продукта:", error);
      setNotification({
        message: "Грешка при редактиране на продукта!",
        type: "error",
      });
    }
  };

  const formFields = [
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
    <div className="products-container">
      <form
        className="product-forms edit-form"
        onSubmit={handleEditProduct}
        encType="multipart/form-data"
      >
        <h2 className="products-dashboard-titles">Редактиране на продукта</h2>
        <h3 className="products-dashboard-titles">
          Категория: {formData.productCategory}
        </h3>
        <Box>
          {formFields.map((field, index) => {
            if (field.disabled) {
              return null;
            }
            return (
              <Box key={index} mb={2}>
                <FormField
                  {...field}
                  value={formData[field.field]}
                  handleChange={(value) => handleChange(field.field, value)}
                  fileInputRef={field.type === "file" ? fileInputRef : null}
                />
              </Box>
            );
          })}
        </Box>
        {imagePreview && (
          <Box mt={2} mb={2} id="dashboard-image-preview-container">
            <img
              src={imagePreview}
              alt="Product Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
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
          Редактирай
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
    </div>
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
            {value
              ? typeof value === "string"
                ? value
                : value.name
              : "Качете изображение"}
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
