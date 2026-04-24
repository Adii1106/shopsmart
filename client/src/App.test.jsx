import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./context/AuthContext', () => ({
    useAuth: () => ({ user: null, loading: false, logout: vi.fn() }),
    AuthProvider: ({ children }) => children
}));

describe('App', () => {
    it('renders the login screen initially', () => {
        render(<App />);
        const linkElement = screen.getByText(/Welcome Back|Create Legacy/i);
        expect(linkElement).toBeInTheDocument();
    });
});
