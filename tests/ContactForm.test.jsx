import { describe, test, expect, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ContactForm from "../src/components/ContactForm";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("Компонент ContactForm", () => {
  test("Изобразяване на всички елементи.", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Име/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Тема/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Съобщение/i)).toBeInTheDocument();
    expect(screen.getByText(/Изпрати съобщение/i)).toBeInTheDocument();
  });

  test("Правилно актуализиране на състоянието при промяна на входа.", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Тема/i), {
      target: { value: "Test Topic" },
    });
    fireEvent.change(screen.getByLabelText(/Съобщение/i), {
      target: { value: "This is a test message." },
    });

    expect(screen.getByLabelText(/Име/i).value).toBe("John Doe");
    expect(screen.getByLabelText(/E-mail/i).value).toBe("john@example.com");
    expect(screen.getByLabelText(/Тема/i).value).toBe("Test Topic");
    expect(screen.getByLabelText(/Съобщение/i).value).toBe(
      "This is a test message."
    );
  });

  test("Изчистване на формуляра и показване на съобщение за успех при успешно изпращане.", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Тема/i), {
      target: { value: "Test Topic" },
    });
    fireEvent.change(screen.getByLabelText(/Съобщение/i), {
      target: { value: "This is a test message." },
    });
    fireEvent.click(screen.getByText(/Изпрати съобщение/i));

    await waitFor(() =>
      expect(
        screen.getByText(/Вашето съобщение е изпратено успешно!/i)
      ).toBeInTheDocument()
    );
    expect(screen.getByLabelText(/Име/i).value).toBe("");
    expect(screen.getByLabelText(/E-mail/i).value).toBe("");
    expect(screen.getByLabelText(/Тема/i).value).toBe("");
    expect(screen.getByLabelText(/Съобщение/i).value).toBe("");
  });

  test("Проверка на максимална дължина на полетата.", () => {
    render(<ContactForm />);

    const longText = "a".repeat(101);
    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: longText },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Тема/i), {
      target: { value: longText },
    });

    expect(screen.getByLabelText(/Име/i).value.length).toBeLessThanOrEqual(255);
    expect(screen.getByLabelText(/Тема/i).value.length).toBeLessThanOrEqual(
      255
    );
  });

  test("Съобщението не се изпраща, ако има задължително поле, което не е попълнено.", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Тема/i), {
      target: { value: "Test Topic" },
    });
    fireEvent.change(screen.getByLabelText(/Съобщение/i), {
      target: { value: "This is a test message." },
    });
    fireEvent.click(screen.getByText(/Изпрати съобщение/i));

    await waitFor(() =>
      expect(
        screen.queryByText(/Вашето съобщение е изпратено успешно!/i)
      ).toBeNull()
    );
  });

  test("Обработване на грешки, свързани с API.", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    axios.post.mockRejectedValueOnce(new Error("API error"));

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Име/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Тема/i), {
      target: { value: "Test Topic" },
    });
    fireEvent.change(screen.getByLabelText(/Съобщение/i), {
      target: { value: "This is a test message." },
    });
    fireEvent.click(screen.getByText(/Изпрати съобщение/i));

    await waitFor(() => expect(errorSpy).toHaveBeenCalled());

    errorSpy.mockRestore();
  });
});
