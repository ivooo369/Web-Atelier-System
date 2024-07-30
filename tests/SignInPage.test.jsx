import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import SignInPage from "../src/pages/site/SignInPage";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

vi.mock("axios");

const setItemMock = vi.fn();
const getItemMock = vi.fn();
beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(setItemMock);
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(getItemMock);
});

describe("Компонент SignInPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Изобразяване на полетата на формуляра и бутона.", () => {
    render(
      <Router>
        <SignInPage />
      </Router>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Парола/i)).toBeInTheDocument();
    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
  });

  test("Обработване на промените при въвеждане на имейл и парола.", () => {
    render(
      <Router>
        <SignInPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Парола/i), {
      target: { value: "password123" },
    });

    expect(screen.getByLabelText(/E-mail/i).value).toBe("test@example.com");
    expect(screen.getByLabelText(/Парола/i).value).toBe("password123");
  });

  test("Показване на икона за превключване на видимостта на паролата и превключване на видимостта.", () => {
    render(
      <Router>
        <SignInPage />
      </Router>
    );

    const passwordInput = screen.getByLabelText(/Парола/i);
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("Изпращане на заявка и обработване успешен отговор.", async () => {
    axios.post.mockResolvedValue({ data: { token: "fakeToken" } });

    render(
      <Router>
        <SignInPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Парола/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Вход/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Успешно влизане в акаунта!/i)
      ).toBeInTheDocument();
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "customerAuthToken",
      "fakeToken"
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "customerEmail",
      "test@example.com"
    );
  });

  test("Показване на съобщение за грешка, когато имейлът или паролата са неправилни.", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: { message: "Невалидни имейл или парола." },
      },
    });

    render(
      <Router>
        <SignInPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Парола/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText(/Вход/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Невалидни имейл или парола./i)
      ).toBeInTheDocument();
    });

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test("Съобщенията за грешка и успех се показват и изчезват след 3 секунди.", async () => {
    render(
      <Router>
        <SignInPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Парола/i), {
      target: { value: "password123" },
    });

    axios.post.mockResolvedValue({ data: { token: "fakeToken" } });
    fireEvent.click(screen.getByText(/Вход/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Успешно влизане в акаунта!/i)
      ).toBeInTheDocument();
    });

    await new Promise((r) => setTimeout(r, 3000));
    expect(
      screen.queryByText(/Успешно влизане в акаунта!/i)
    ).not.toBeInTheDocument();
  });
});
