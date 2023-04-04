import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/react';

import Signin from './Signin'



//   Test if the component renders without crashing  

describe('Signin', () => {
  it('should render without crashing', () => {
    render(< Signin />);
  });
});


//  Test if the checkbox inputs are displayed

it('should display the checkbox inputs', () => {
    const { getByRole } = render(<Signin />);
    const checkbox1 = getByRole('checkbox', { name: /join as student/i });
    const checkbox2 = getByRole('checkbox', { name: /join as teacher/i });
  
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox2).toBeInTheDocument();
  });


  // Test that the Sign In heading is displayed

  test('renders sign in heading', () => {
    render(<Signin />);
    const headingElement = screen.getByText('Sign In');
    expect(headingElement).toBeInTheDocument();
  });

  
  // Test that the username input field is displayed

  test('renders username input field', () => {
    render(< Signin />);
    const inputElement = screen.getByPlaceholderText('username');
    expect(inputElement).toBeInTheDocument();
  });
  

  // Test that the password input field is displayed


  test('renders password input field', () => {
    render(< Signin />);
    const inputElement = screen.getByPlaceholderText('Password');
    expect(inputElement).toBeInTheDocument();
  });


  // Test that the checkbox is displayed

  test('renders checkbox', () => {
    render(<Signin />);
    const checkboxElement = screen.getByLabelText('Check me out');
    expect(checkboxElement).toBeInTheDocument();
  });


  // Test that the forgot password link is displayed and clickable


  test('renders forgot password link', () => {
    render(<Signin />);
    const linkElement = screen.getByText('Forgot Password?');
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe('/');
  });
  


  

  // Test that the login button is displayed and clickable

  test('renders login button', () => {
    render(<Signin />);
    const buttonElement = screen.getByRole('button', { name: 'Login' });
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    
  });
  
  
  


 


  
  
  
  

  







  