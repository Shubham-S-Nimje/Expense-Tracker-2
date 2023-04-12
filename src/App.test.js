import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Welcome to Expense Tracker!.. ', () => {
  render(<App />);
  const linkElement = screen.getByText('Welcome to Expense Tracker!..');
  expect(linkElement).toBeInTheDocument();
});
