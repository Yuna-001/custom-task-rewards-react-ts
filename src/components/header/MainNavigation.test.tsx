import { render, screen, logRoles } from "@testing-library/react";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

import MainNavigation from "./MainNavigation";
import { BrowserRouter } from "react-router-dom";

test("link active flow", async () => {
  const user = userEvent.setup();

  const { container } = render(
    <BrowserRouter>
      <MainNavigation />
    </BrowserRouter>,
  );

  logRoles(container);

  const [tasksLink, rewardsLink, storageLink] = screen.getAllByRole("link");

  expect(tasksLink).not.toHaveClass("active");
  expect(rewardsLink).not.toHaveClass("active");
  expect(storageLink).not.toHaveClass("active");

  await user.click(tasksLink);

  expect(tasksLink).toHaveClass("active");
  expect(rewardsLink).not.toHaveClass("active");
  expect(storageLink).not.toHaveClass("active");

  await user.click(rewardsLink);

  expect(tasksLink).not.toHaveClass("active");
  expect(rewardsLink).toHaveClass("active");
  expect(storageLink).not.toHaveClass("active");

  await user.click(storageLink);

  expect(tasksLink).not.toHaveClass("active");
  expect(rewardsLink).not.toHaveClass("active");
  expect(storageLink).toHaveClass("active");
});
