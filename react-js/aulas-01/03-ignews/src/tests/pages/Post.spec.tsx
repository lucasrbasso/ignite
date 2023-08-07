import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic');
jest.mock('next-auth/client');

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post Excerpt</p>',
  updatedAt: 'March, 10',
};

describe('Post page', () => {
  it('should renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post Excerpt')).toBeInTheDocument();
  });

  it('should redirect user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: '/',
          permanent: false,
        },
      }),
    );
  });

  it('should loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My New Post' }],
          content: [{ type: 'paragraph', text: 'Post content' }],
        },
        last_publication_date: '04-01-2021',
      }),
    } as any);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    });

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021',
          },
        },
      }),
    );
  });
});
