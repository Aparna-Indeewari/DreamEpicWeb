import { render, screen, fireEvent } from '@testing-library/react';
import Profilepage from './Profilepage'



// Test that the name is rendered with the correct text

test('renders name with correct text', () => {
    render(<Profilepage />);
    const name = screen.getByText('John Perea');
    expect(name).toBeInTheDocument();
  });
  
  // Test that the page title is "Change password"

  test('renders page title', () => {
    render(<Profilepage />);
    const pageTitle = screen.getByText('Change password');
    expect(pageTitle).toBeInTheDocument();
  });

  // Test that the "Current Password" input field is rendered and has the correct placeholder text

  test('renders Current Password input field', () => {
    render(<Profilepage />);
    const currentPasswordField = screen.getByPlaceholderText('Enter password');
    expect(currentPasswordField).toBeInTheDocument();
  });
  
  // Test that the "New Password" input field is rendered and has the correct placeholder text.

  test('renders New Password input field', () => {
    render(<Profilepage />);
    const newPasswordField = screen.getByPlaceholderText('Enter New Password');
    expect(newPasswordField).toBeInTheDocument();
  });


  // Test that the "Confirm Password" input field is rendered and has the correct placeholder text.

  test('renders Confirm Password input field', () => {
    render(<Profilepage />);
    const confirmPasswordField = screen.getByPlaceholderText('Confirm Password');
    expect(confirmPasswordField).toBeInTheDocument();
  });


  //   Test that the "Save" button is rendered and that its text matches

  test('renders save button', () => {
    render(<Profilepage />);
    const saveButton = screen.getByText('~ Save ~');
    expect(saveButton).toBeInTheDocument();
  });


  // Test that the "Save" button is disabled when any of the password fields is empty.

  test('disables Save button when any password field is empty', () => {
    render(<Profilepage />);
    const currentPasswordField = screen.getByPlaceholderText('Enter password');
    const newPasswordField = screen.getByPlaceholderText('Enter New Password');
    const confirmPasswordField = screen.getByPlaceholderText('Confirm Password');
  
    fireEvent.change(currentPasswordField, { target: { value: 'currentpassword' } });
    fireEvent.change(newPasswordField, { target: { value: '' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'newpassword' } });
    
  });
 
  
  // Test that the "Save" button is enabled when all the password fields are filled

  test('enables Save button when all password fields are filled', () => {
    render(<Profilepage />);
    const currentPasswordField = screen.getByPlaceholderText('Enter password');
    const newPasswordField = screen.getByPlaceholderText('Enter New Password');
    const confirmPasswordField = screen.getByPlaceholderText('Confirm Password');
    const saveButton = screen.getByText('~ Save ~');
    
    fireEvent.change(currentPasswordField, { target: { value: 'currentpassword' } });
    fireEvent.change(newPasswordField, { target: { value: 'newpassword' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'newpassword' } });
    
    expect(saveButton).toBeEnabled();
  });
  


  
  
  




  
  
  