import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("Initial App component's", () => {
  test("authState change flow", async () => {
    const user = userEvent.setup();
    render(<App />);

    const [loginButton, signupButton] = screen.getAllByRole("listitem");

    expect(loginButton).toHaveClass("active");
    expect(signupButton).not.toHaveClass("active");

    await user.click(signupButton);

    expect(loginButton).not.toHaveClass("active");
    expect(signupButton).toHaveClass("active");
  });
});
