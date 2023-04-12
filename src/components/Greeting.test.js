import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

describe('Greeting component', () => {
test('renders Hello as a text', () => {
    //Arrange
    render(<Greeting/>);
    //Act
    //nothing...

    //Assert
    const HelloElement = screen.getByText('Hello');
    expect(HelloElement).toBeInTheDocument();
  });
});