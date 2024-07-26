import "../../styles/dashboard/ProductsDashboard.css";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import FormField from "../../layouts/others/FormField";
import { getFormFields } from "../../utils/formFields";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const functionOfTheComponent = "edit";

export default function EditProductPage() {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [existingProducts, setExistingProducts] = useState([]);
  const [originalProductName, setOriginalProductName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { productId } = useParams();
  const navigateTo = useNavigate();

  const fields = getFormFields(
    formData,
    materialOptions,
    functionOfTheComponent
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/admin/dashboard/products/edit/${productId}`
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
          setImagePreview(`${product_image_path}`);
        }

        const productsResponse = await axios.get(
          `${apiUrl}/admin/dashboard/products?category=${product_category}`
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
      } finally {
        setIsLoading(false);
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
    if (notification.type === "error" || notification.type === "loading") {
      hideNotificationTimer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
    }

    return () => {
      clearTimeout(hideNotificationTimer);
    };
  }, [notification]);

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
    setIsLoading(true);

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
      setIsLoading(false);
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
        setIsLoading(false);
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
        `${apiUrl}/admin/dashboard/products/edit/${productId}`,
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
        }, 1500);
      } else {
        throw new Error("Неуспешно редактиране на продукта!");
      }
    } catch (error) {
      console.error("Грешка при редактиране на продукта:", error);
      setNotification({
        message: "Грешка при редактиране на продукта!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="products-container pages">
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
        <Box mt={2}>
          {(isLoading || notification.type === "loading") && (
            <div className="notification-messages loading-messages">
              Редактиране на продукта...
            </div>
          )}
          {notification.message && !isLoading && (
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
        </Box>
      </form>
    </div>
  );
}
