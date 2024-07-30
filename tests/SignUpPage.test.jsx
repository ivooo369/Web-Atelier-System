import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, afterEach, vi } from "vitest";
import SignUpPage from "../src/pages/site/SignUpPage";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    BrowserRouter: actual.BrowserRouter,
  };
});

describe("Компонент SignUpPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Изобразяване на всички полета на формуляра, както и бутоните.", () => {
    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    expect(screen.getByLabelText(/Име/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Парола/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Потвърдете паролата/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Град/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Адрес/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Регистрация/i })
    ).toBeInTheDocument();
  });

  test("Обработване на промените при въвеждане на данни.", () => {
    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    const nameInput = screen.getByLabelText(/Име/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInputs = screen.getAllByLabelText(/Парола/i);
    const confirmPasswordInput = screen.getByLabelText(/Потвърдете паролата/i);
    const phoneInput = screen.getByLabelText(/Телефон/i);

    fireEvent.change(nameInput, { target: { value: "Иван" } });
    fireEvent.change(emailInput, { target: { value: "ivan@example.com" } });
    fireEvent.change(passwordInputs[0], { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    expect(nameInput.value).toBe("Иван");
    expect(emailInput.value).toBe("ivan@example.com");
    expect(passwordInputs[0].value).toBe("password123");
    expect(confirmPasswordInput.value).toBe("password123");
    expect(phoneInput.value).toBe("1234567890");
  });

  test("Показване на съобщение за грешка при неуспешно изпращане на заявка.", async () => {
    axios.post.mockRejectedValue(new Error("Неуспешно изпращане на заявка"));

    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: "Иван" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "ivan@example.com" },
    });
    fireEvent.change(screen.getAllByLabelText(/Парола/i)[0], {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Потвърдете паролата/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Телефон/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByText(/Регистрация/i));

    const errorMessage = await screen.findByText("Грешка при регистрацията!");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Показване на икона за превключване на видимостта на паролата и превключване на видимостта.", () => {
    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    const passwordInputs = screen.getAllByLabelText(/Парола/i);

    expect(passwordInputs).toHaveLength(2);

    const passwordInput = passwordInputs[0];
    const toggleButton = screen.getAllByRole("button", {
      name: /toggle password visibility/i,
    })[0];

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("Показване на съобщение за грешка при парола по-кратка от 8 символа.", async () => {
    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: "Иван" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "ivan@example.com" },
    });

    const passwordInput = screen.getAllByLabelText(/Парола/i)[0];
    fireEvent.change(passwordInput, {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText(/Потвърдете паролата/i), {
      target: { value: "short" },
    });

    fireEvent.change(screen.getByLabelText(/Телефон/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Регистрация/i }));

    const errorMessage = await screen.findByText(
      "Паролата трябва да бъде поне 8 символа!"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("Съобщенията за грешка и успех се показват и изчезват след 3 секунди.", async () => {
    axios.post.mockResolvedValue({ data: { token: "fakeToken" } });

    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: "Иван" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "ivan@example.com" },
    });

    const [passwordInput] = screen.getAllByLabelText(/Парола/i);
    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    const confirmPasswordInput = screen.getByLabelText(/Потвърдете паролата/i);
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByLabelText(/Телефон/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Регистрация/i }));

    await waitFor(() => {
      expect(screen.getByText(/Регистрацията е успешна!/i)).toBeInTheDocument();
    });

    await new Promise((r) => setTimeout(r, 3000));
    expect(
      screen.queryByText(/Регистрацията е успешна!/i)
    ).not.toBeInTheDocument();
  });
});
