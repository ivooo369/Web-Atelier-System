import { describe, test, expect, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditProductPage from "../src/pages/dashboard/EditProductPage";
import axios from "axios";

vi.mock("axios");

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Компонент EditProductPage", () => {
  test("Правилно извличане и зареждане на данни за продукта.", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("edit")) {
        return Promise.resolve({
          data: {
            product_name: "Test Product",
            product_category: "Рамки",
            product_price: "100",
            product_material: "Полистирен",
            product_type: "Type",
            product_description: "Description",
            product_width: "20",
            product_height: "30",
            product_image_path: "image.jpg",
          },
        });
      }
      if (url.includes("products")) {
        return Promise.resolve({
          data: [{ product_name: "Existing Product", product_id: "1" }],
        });
      }
    });

    renderWithRouter(<EditProductPage />);

    expect(
      await screen.findByDisplayValue(/Test Product/i)
    ).toBeInTheDocument();
    expect(await screen.findByDisplayValue(/100/i)).toBeInTheDocument();
  });

  test("Показване на съобщение за грешка при неуспешно зареждане на данни.", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );

    renderWithRouter(<EditProductPage />);

    expect(
      await screen.findByText(
        /Грешка при зареждане на продукта за редактиране!/i
      )
    ).toBeInTheDocument();
  });

  test("Показване на предварителен преглед на изображението.", async () => {
    renderWithRouter(<EditProductPage />);

    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByLabelText(/Качете изображение/i);

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText(/Product Preview/i)).toBeInTheDocument();
    });
  });

  test("Премахване на изображение и нулиране на предварителния преглед.", async () => {
    renderWithRouter(<EditProductPage />);

    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByLabelText(/Качете изображение/i);
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText(/Product Preview/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(screen.queryByAltText(/Product Preview/i)).not.toBeInTheDocument();
    });
  });

  test("Не позволява изпращане на формата, ако някои задължителни полета са празни.", async () => {
    renderWithRouter(<EditProductPage />);

    fireEvent.change(screen.getByLabelText(/Наименование/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/Описание/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Редактирай/i }));

    expect(
      await screen.findByText(
        /Моля, попълнете всички полета и качете изображение за продукта!/i
      )
    ).toBeInTheDocument();
  });

  test("Валидиране на задължителни полета при изпращане на формата.", async () => {
    renderWithRouter(<EditProductPage />);

    fireEvent.click(screen.getByRole("button", { name: /Редактирай/i }));

    expect(
      await screen.findByText(
        /Моля, попълнете всички полета и качете изображение за продукта!/i
      )
    ).toBeInTheDocument();
  });
});
