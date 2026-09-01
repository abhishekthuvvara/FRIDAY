import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('FRIDAY App Foundation', () => {
  it('renders the landing page correctly', () => {
    render(<App />);
    expect(screen.getByText(/FRIDAY/i)).toBeDefined();
    expect(screen.getByText(/AI Coding Assistant/i)).toBeDefined();
  });
});
