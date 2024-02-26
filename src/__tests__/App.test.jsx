import { render, screen } from '@testing-library/react'
import { expect } from 'vitest';
import App from '../../src/App.jsx'

describe('App', () => {
    it('renders the App heading', () => {
      render(<App />);
      const headingElement = screen.getByText('Weather radar -project');
      expect(headingElement).toBeInTheDocument();
    });

  })