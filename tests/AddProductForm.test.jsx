import { describe, test, expect, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddProductForm from "../src/components/AddProductForm";

vi.mock("axios");

describe("Компонент AddProductForm", () => {
  test("Изобразяване на всички полета и бутони.", () => {
    render(<AddProductForm onProductsUpdate={() => {}} />);

    screen.debug();

    expect(screen.getByText(/Добавяне на нов продукт/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Наименование/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Материал/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Предназначение/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ширина/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Височина/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Качете изображение/i)).toBeInTheDocument();
    expect(screen.getByText(/Добави нов продукт/i)).toBeInTheDocument();
  });

  test("Правилна актуализация на състоянието при промяна на полета.", () => {
    render(<AddProductForm onProductsUpdate={() => {}} />);

    fireEvent.change(screen.getByLabelText(/Наименование/i), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByLabelText(/Цена/i), {
      target: { value: "100" },
    });

    expect(screen.getByLabelText(/Наименование/i).value).toBe("New Product");
    expect(screen.getByLabelText(/Цена/i).value).toBe("100");
  });

  test("Ограничаване на дължината на името на продукта до 30 символа.", () => {
    render(<AddProductForm onProductsUpdate={() => {}} />);

    const nameInput = screen.getByLabelText(/Наименование/i);

    fireEvent.change(nameInput, {
      target: { value: "Ако това е име, което е по-дълго от тридесет символа" },
    });

    expect(nameInput.value).toHaveLength(30);
  });

  test("Премахване на изображение и нулиране на предварителния преглед.", async () => {
    render(<AddProductForm onProductsUpdate={() => {}} />);

    fireEvent.change(screen.getByLabelText(/Качете изображение/i), {
      target: { files: [new File([""], "image.jpg", { type: "image/jpeg" })] },
    });

    await waitFor(() => {
      expect(
        screen.getByRole("img", { name: /Product Preview/i })
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(
        screen.queryByRole("img", { name: /Product Preview/i })
      ).not.toBeInTheDocument();
    });
  });

  test("Отказ на изпратено изображение при натискане на бутона за премахване.", async () => {
    render(<AddProductForm onProductsUpdate={() => {}} />);

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

  test("Добавяне на изображение и проверка на предварителния преглед.", async () => {
    render(<AddProductForm onProductsUpdate={() => {}} />);

    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByLabelText(/Качете изображение/i), {
      target: { files: [file] },
    });

    await waitFor(() => {
      expect(screen.getByAltText(/Product Preview/i)).toBeInTheDocument();
    });
  });
});
