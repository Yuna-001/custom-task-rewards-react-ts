import { render, screen, logRoles } from "@testing-library/react";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

import Authentication from "./Authentication";

test("authState change flow", async () => {
  const user = userEvent.setup();
  const { container } = render(<Authentication />);

  logRoles(container);

  const [loginButton, signupButton] = screen.getAllByRole("listitem");

  expect(loginButton).toHaveClass("active");

  await user.click(signupButton);

  expect(signupButton).toHaveClass("active");
});
