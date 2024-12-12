import React from "react";
import { render } from "@testing-library/react-native";
import Splash from "../app/Splash"; // Ajusta la ruta según tu estructura de proyecto

jest.mock("../assets/jireh.jpg", () => "mockImage"); // Mock para la imagen

describe("Splash Screen", () => {
  it("debería renderizar la imagen y el texto correctamente", () => {
    const { getByText, getByTestId } = render(<Splash />);

    // Verifica que el texto se renderiza
    expect(getByText("Bienvenidos a JIREH")).toBeTruthy();

    // Verifica que la imagen se renderiza usando el testID
    const image = getByTestId("splash-image");
    expect(image.props.source).toEqual("mockImage");
  });
});
