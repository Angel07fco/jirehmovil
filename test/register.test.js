import React from "react";
import { render } from "@testing-library/react-native";
import Register from "../app/auth/registerJireh";

test("renders register component correctly", () => {
  const { getByTestId } = render(<Register />);
  expect(getByTestId("name-input")).toBeTruthy();
  expect(getByTestId("email-input")).toBeTruthy();
  expect(getByTestId("password-input")).toBeTruthy();
  expect(getByTestId("register-button")).toBeTruthy();
});
