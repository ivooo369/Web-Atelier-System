import { describe, test, expect, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PurchaseForm from "../src/components/PurchaseForm";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Компонент PurchaseForm", () => {
  test("Изобразяване на всички елементи.", () => {
    renderWithRouter(
      <PurchaseForm
        userData={{}}
        setUserData={() => {}}
        cartItems={[]}
        clearCart={() => {}}
      />
    );
    expect(screen.getByLabelText(/Име/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Град/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Адрес/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/i)).toBeInTheDocument();
    expect(screen.getByText(/Потвърди поръчката/i)).toBeInTheDocument();
  });

  test("Правилно актуализиране на състоянието при промяна на входа.", () => {
    renderWithRouter(
      <PurchaseForm
        userData={{}}
        setUserData={() => {}}
        cartItems={[]}
        clearCart={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Телефон/i), {
      target: { value: "1234567890" },
    });

    expect(screen.getByLabelText(/Име/i).value).toBe("John Doe");
    expect(screen.getByLabelText(/E-mail/i).value).toBe("john@example.com");
    expect(screen.getByLabelText(/Телефон/i).value).toBe("1234567890");
  });

  test("Показване на съобщение за грешка при непопълнени задължителни полета.", () => {
    renderWithRouter(
      <PurchaseForm
        userData={{ name: "", city: "", address: "", email: "", phone: "" }}
        setUserData={() => {}}
        cartItems={[]}
        clearCart={() => {}}
      />
    );

    fireEvent.click(screen.getByText(/Потвърди поръчката/i));

    expect(
      screen.getByText(/Моля, попълнете всички задължителни полета!/i)
    ).toBeInTheDocument();
  });

  test("Показване на съобщение за грешка при невалиден формат на телефонен номер.", () => {
    renderWithRouter(
      <PurchaseForm
        userData={{
          name: "John Doe",
          city: "Test City",
          address: "Test Address",
          email: "john@example.com",
          phone: "12345",
        }}
        setUserData={() => {}}
        cartItems={[{ id: 1, name: "Test Item", price: 10 }]}
        clearCart={() => {}}
      />
    );

    fireEvent.click(screen.getByText(/Потвърди поръчката/i));

    expect(
      screen.getByText(/Телефонът трябва да съдържа точно 10 цифри!/i)
    ).toBeInTheDocument();
  });

  test("Успешно изпращане на поръчката и навигация към началната страница.", async () => {
    const clearCart = vi.fn();
    const setUserData = vi.fn();

    axios.post.mockResolvedValueOnce({});

    renderWithRouter(
      <PurchaseForm
        userData={{
          name: "John Doe",
          city: "Test City",
          address: "Test Address",
          email: "john@example.com",
          phone: "1234567890",
          additionalInformation: "",
        }}
        setUserData={setUserData}
        cartItems={[{ id: 1, name: "Test Item", price: 10 }]}
        clearCart={clearCart}
      />
    );

    fireEvent.click(screen.getByText(/Потвърди поръчката/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/calculator/cart`,
        {
          customerName: "John Doe",
          customerCity: "Test City",
          customerAddress: "Test Address",
          customerEmail: "john@example.com",
          customerPhone: "1234567890",
          additionalInformation: "",
          orderItems: [{ id: 1, name: "Test Item", price: 10 }],
        }
      );

      expect(clearCart).toHaveBeenCalled();
      expect(setUserData).toHaveBeenCalledWith({
        name: "John Doe",
        city: "Test City",
        address: "Test Address",
        email: "john@example.com",
        phone: "1234567890",
        additionalInformation: "",
      });

      expect(
        screen.getByText(/Поръчката е успешно изпратена!/i)
      ).toBeInTheDocument();
    });
  });

  test("Правилно поведение при неуспешно извличане на потребителските данни.", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));
    renderWithRouter(
      <PurchaseForm
        userData={{}}
        setUserData={() => {}}
        cartItems={[]}
        clearCart={() => {}}
      />
    );

    await waitFor(() => {
      expect(
        screen.queryByText(/Грешка при извличане на данните на потребителя:/i)
      ).not.toBeInTheDocument();
    });
  });
});
