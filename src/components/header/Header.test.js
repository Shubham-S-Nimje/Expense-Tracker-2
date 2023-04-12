import { render, screen } from "@testing-library/react";
import Header from "./Header";
import userEvent from "@testing-library/user-event";

describe('Header component', () => {
    test('renders Login if not isAuth', () => {
        //Arrange
        render(<Header/>);
        //Act
        //nothing...
    
        //Assert
        const headerElement = screen.getByText('Login', { exact: false });
        expect(headerElement).toBeInTheDocument();
      });

test('renders "Logout" if isAuth', () => {
    //Arrange
    render(<Header/>);
    //Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement)

    //Assert
    const headerElement = screen.getByText('Logout', { exact: false });
    expect(headerElement).toBeInTheDocument();
  });

});