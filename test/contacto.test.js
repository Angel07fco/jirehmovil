import React from "react";
import { render } from "@testing-library/react-native";
import ContactForm from "../app/auth/contacto.jireh";

test("renders contact form correctly", () => {
  const { getByTestId } = render(<ContactForm />);
  expect(getByTestId("name-input")).toBeTruthy();
  expect(getByTestId("email-input")).toBeTruthy();
  expect(getByTestId("message-input")).toBeTruthy();
  expect(getByTestId("send-button")).toBeTruthy();
});
