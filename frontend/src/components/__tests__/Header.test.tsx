import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Header from '../Header';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders logo and navigation', () => {
    render(<Header />);
    
    expect(screen.getByText('Science 1B')).toBeInTheDocument();
    expect(screen.getByText('St. John\'s Grammar SHS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Gallery' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Articles' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('shows mobile menu button on small screens', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('highlights active page', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');
    render(<Header />);
    
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveClass('text-primary-600');
  });
});
