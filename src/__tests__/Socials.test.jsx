import { render, screen } from '@testing-library/react';
import Socials from '../Socials';
import { describe, it, expect } from 'vitest';

describe('Socials Page', () => {
  it('renders the title correctly', () => {
    render(<Socials />);
    expect(screen.getByText(/stay updated/i)).toBeInTheDocument();
  });

  it('renders the social icons as links', () => {
    render(<Socials />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('each icon has the correct link', () => {
    render(<Socials />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://facebook.com');
    expect(links[1]).toHaveAttribute('href', 'https://twitter.com');
    expect(links[2]).toHaveAttribute('href', 'https://instagram.com');
  });
});