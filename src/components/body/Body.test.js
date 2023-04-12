import { render, screen } from "@testing-library/react";
import Body from "./Body";

describe('Body component', () => {
test('renders "Sign In" when signin', () => {
    //Arrange
    render(<Body/>);
    //Act
    //nothing...

    //Assert
    const BodyElement = screen.getByText('Sign In', { exact: false });
    expect(BodyElement).toBeInTheDocument();
  });
});