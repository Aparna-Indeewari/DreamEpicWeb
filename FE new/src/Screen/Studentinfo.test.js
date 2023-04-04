import { fireEvent, render  } from '@testing-library/react';
import { screen } from '@testing-library/react';


import Studentinfo from './Studentinfo'

// Test that the component renders without errors

test('renders Studentinfo component without errors', () => {
  render(<Studentinfo />);
});


// Test that the modal is not displayed by default

test('modal is not displayed by default', () => {
  render(<Studentinfo />);
  const modalElement = screen.queryByTestId('modal');
  expect(modalElement).not.toBeInTheDocument();
});


// Test that the "Launch demo modal" button is visible

test('renders "Launch demo modal" button', () => {
  render(<Studentinfo />);
  const buttonElement = screen.getByText(/Launch demo modal/i);
  expect(buttonElement).toBeInTheDocument();
});


// Test that the data is displayed correctly in the cards

test('renders data in cards correctly', () => {
  const testData = [    { name: 'John', id: '123', status: 'Active', image: 'image1.png' },    { name: 'Jane', id: '456', status: 'Inactive', image: 'image2.png' },  ];
  render(<Studentinfo data={testData} />);
  const card1 = screen.getByText(/John/i);
  expect(card1).toBeInTheDocument();
});



















