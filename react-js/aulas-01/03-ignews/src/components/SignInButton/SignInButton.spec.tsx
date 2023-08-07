import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('SignInButton component', () => {
  it('should be able to SignInButton component renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    const signInButton = screen.getByText('Sign in with Github');

    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalledWith('github');
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('should be able to SignInButton component renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should logout user on click', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
      },
      false,
    ]);

    const signOutMocked = mocked(signOut);

    render(<SignInButton />);

    const signOutButton = screen.getByText('John Doe');

    fireEvent.click(signOutButton);

    expect(signOutMocked).toHaveBeenCalled();
  });
});
