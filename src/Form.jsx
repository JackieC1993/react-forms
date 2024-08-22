import React, { useState } from 'react';
import './Form.css';

function Form() {
  const [inputValues, setInputValues] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    setInputValues(event.target.value);
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  const calculateResult = () => {
    const numbers = inputValues.split(',').map(Number);

    // Check if the input is valid
    if (numbers.some(isNaN)) {
      setIsValid(false)
      setResult('Invalid input.');
      return;
    }
setIsValid(true)

    switch (operation) {
      case 'sum':
        setResult(numbers.reduce((sum, num) => sum + num, 0));
        break;
      case 'average':
        setResult(numbers.reduce((sum, num) => sum + num, 0) / numbers.length);
        break;
      case 'mode':
        setResult(calculateMode(numbers));
        break;
      default:
        setResult('');
    }
     // Clear the input boxes if the input is valid
     if (isValid) {
      setInputValues('');
    }
  };

  const calculateMode = (numbers) => {
    const count = {};
    let maxCount = 0;
    let mode = null;

    for (const num of numbers) {
      count[num] = (count[num] || 0) + 1;
      if (count[num] > maxCount) {
        maxCount = count[num];
        mode = num;
      }
    }

    return mode !== null ? mode : 'Invalid input.';
  };

  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        calculateResult();
      }}>
        <input
          id="values"
          name="values"
          type="text"
          value={inputValues}
          onChange={handleInputChange}
          className={!isValid ? 'error' : ''}
        />
        <select
          id="operation"
          name="operation"
          value={operation}
          onChange={handleOperationChange}
          className={!isValid ? 'error' : ''}
        >
          <option value="">Select an operation</option>
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="mode">Mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </div>
  );
}

export default Form;