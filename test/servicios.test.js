import React from "react";
import { render } from "@testing-library/react-native";
import ServicesList from "../app/auth/serviciosjireh";

test("renders services list correctly", () => {
  const { getByTestId } = render(<ServicesList />);
  expect(getByTestId("service-1")).toBeTruthy();
  expect(getByTestId("service-2")).toBeTruthy();
  expect(getByTestId("service-3")).toBeTruthy();
});
