import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button title="Click Me" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('bg-blue-500');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button title="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies Cancel style', () => {
    render(<Button title="Cancel" buttonStyle="Cancel" />);
    expect(screen.getByTestId('button')).toHaveClass('bg-gray-500');
  });

  it('applies Delete style', () => {
    render(<Button title="Delete" buttonStyle="Delete" />);
    expect(screen.getByTestId('button')).toHaveClass('bg-red-500');
  });

  it('uses submit type if specified', () => {
    render(<Button title="Submit" type="submit" />);
    expect(screen.getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('applies big padding if big=true', () => {
    render(<Button title="Big Button" big />);
    expect(screen.getByTestId('button')).toHaveClass('px-8');
  });
});
