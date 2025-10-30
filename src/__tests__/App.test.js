import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

describe("Newsletter Signup Form", () => {
  test("renders form with all inputs and checkboxes", () => {
    render(<App />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/javascript/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/css/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  test("updates form inputs when user types", async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.type(nameInput, "Mary");
    await user.type(emailInput, "mary@example.com");

    expect(nameInput).toHaveValue("Mary");
    expect(emailInput).toHaveValue("mary@example.com");
  });

  test("toggles checkboxes when clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const jsCheckbox = screen.getByLabelText(/javascript/i);
    const reactCheckbox = screen.getByLabelText(/react/i);

    await user.click(jsCheckbox);
    await user.click(reactCheckbox);

    expect(jsCheckbox).toBeChecked();
    expect(reactCheckbox).toBeChecked();
  });

  test("submits form and shows success message with interests", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), "Mary");
    await user.type(screen.getByLabelText(/email/i), "mary@example.com");
    await user.click(screen.getByLabelText(/javascript/i));
    await user.click(screen.getByLabelText(/react/i));
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByRole("heading", { name: /success/i })).toBeInTheDocument();
    expect(screen.getByText(/thank you, mary/i)).toBeInTheDocument();
    expect(screen.getByText(/mary@example\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/javascript.*react/i)).toBeInTheDocument();
  });

  test("shows success message when no interests selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), "John");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByText(/no interests selected/i)).toBeInTheDocument();
  });
});