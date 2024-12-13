import React from "react";
import { render } from "@testing-library/react-native";
import Login from "../app/auth/loginjireh";

test("renders login component correctly", () => {
  const { getByTestId } = render(<Login />);
  expect(getByTestId("email-input")).toBeTruthy();
  expect(getByTestId("password-input")).toBeTruthy();
  expect(getByTestId("login-button")).toBeTruthy();
});
