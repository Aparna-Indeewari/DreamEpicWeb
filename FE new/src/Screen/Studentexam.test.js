import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/react';


import Studentexam from './Studentexam'



describe('Studentexam', () => {

    // Test that the select element renders with the correct options

    test('renders select element with correct options', () => {
        const { getByRole } = render(<Studentexam />);
        const selectElement = getByRole('combobox');
        expect(selectElement).toBeInTheDocument();
        expect(selectElement).toHaveTextContent('Select Exam');
        expect(selectElement).toHaveTextContent('Exam 1');
        expect(selectElement).toHaveTextContent('Exam 2');
        expect(selectElement).toHaveTextContent('Exam 3');
      });
      

    //   Test that selecting an option triggers the correct behavior

      test('selecting an option triggers correct behavior', () => {
        const { getByRole } = render(<Studentexam />);
        const selectElement = getByRole('combobox');
      
        fireEvent.change(selectElement, { target: { value: 'Exam 1' } });
      
      });
      

    //   Test reders save button

      test('renders save button', () => {
        render(<Studentexam />);
        const saveButton = screen.getByRole('button', { name: /save/i });
        expect(saveButton).toBeInTheDocument();
        });
    

    // Test  clicking save button triggers save function

      test('clicking save button triggers save function', () => {
        const saveMock = jest.fn();
        render(<Studentexam save={saveMock} />);
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);
            
  });
});
