import { render,screen, fireEvent } from '@testing-library/react';

import Teacherexam from './Teacherexam';


// Test that the correct options are displayed in the select dropdown

test('displays correct exam options in select dropdown', () => {
    render(<Teacherexam />);
    const selectElement = screen.getByRole('combobox');
    const options = selectElement.querySelectorAll('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('Select Exam');
    expect(options[1]).toHaveTextContent('Exam 1');
    expect(options[2]).toHaveTextContent('Exam 2');
    expect(options[3]).toHaveTextContent('Exam 3');
  });


//   Test that the "Save" button is clickable

  test('clicking the "Save" button triggers a save action', () => {
    const saveHandler = jest.fn();
    render(<Teacherexam onSave={saveHandler} />);
    const saveButton = screen.getByRole('button', { name: '~ Save ~' });
    fireEvent.click(saveButton);
  });



  
  
  



