/* eslint-disable */
import { screen, render, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import LoginForm from "./LoginForm";

beforeEach(() => {
  fetch.resetMocks();
});

const user = userEvent.setup();

it("POST request", async () => {
  render(<LoginForm></LoginForm>);
  const mockResponsePost = { data: "POSTED data to table" };

  const loginForm = screen.getByTestId("login-form");
  const addBtn = within(loginForm).queryByText("Submit");
  await user.click(addBtn);

  expect(
    fetch.mockResponse((request) => {
      return JSON.stringify(mockResponsePost);
    })
  );
});
