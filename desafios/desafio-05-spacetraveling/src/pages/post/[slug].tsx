import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiEdit2, FiUser } from 'react-icons/fi';
import { RichText } from 'prismic-dom';

import Link from 'next/link';
import Prismic from '@prismicio/client';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo } from 'react';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Comments from '../../components/Comments';

interface Post {
  slug: string;
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface navigationPost {
  uid: string;
  data: {
    title: string;
  };
}

interface PostProps {
  post: Post;
  navigation: {
    prevPost: navigationPost[];
    nextPost: navigationPost[];
  };
  preview: boolean;
}

const Post: React.FC<PostProps> = ({ post, preview, navigation }) => {
  const router = useRouter();

  const minutesRead = useMemo(() => {
    const totalwords = post.data.content.reduce((total, contentItem) => {
      total += contentItem.heading.split(' ').length;

      const words = contentItem.body.map(item => item.text.split(' ').length);
      words.map(word => (total += word));

      return total;
    }, 0);

    return Math.ceil(totalwords / 200);
  }, [post.data.content]);

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  const isPostEdited =
    post.first_publication_date !== post.last_publication_date;

  return (
    <>
      <Head>
        <title>{post.data.title} | SpaceTraveling</title>
      </Head>

      <img className={styles.banner} src={post.data.banner.url} alt="banner" />

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.data.title}</h1>
          <div className={styles.about}>
            <div>
              <FiCalendar />
              {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </div>
            <div>
              <FiUser />
              {post.data.author}
            </div>
            <div>
              <FiClock />
              {`${minutesRead} min`}
            </div>
          </div>
          {isPostEdited && (
            <div className={styles.edited}>
              <FiEdit2 />
              {format(
                new Date(post.first_publication_date),
                "'editado em 'dd 'de' MMM yyyy', às 'H':'m",
                {
                  locale: ptBR,
                }
              )}
            </div>
          )}
          {post.data.content.map(content => (
            <div key={content.heading} className={styles.postContent}>
              <h2>{content.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </div>
          ))}
        </article>

        <aside className={styles.bottomContainer}>
          <nav>
            {navigation.prevPost[0] ? (
              <div className={styles.prevPost}>
                <h3>{navigation.prevPost[0].data.title}</h3>
                <Link href={`/post/${navigation.prevPost[0].uid}`}>
                  <a>Post Anterior</a>
                </Link>
              </div>
            ) : (
              <div />
            )}
            {navigation.nextPost[0] && (
              <div className={styles.nextPost}>
                <h3>{navigation.nextPost[0].data.title}</h3>
                <Link href={`/post/${navigation.nextPost[0].uid}`}>
                  <a>Próximo Post</a>
                </Link>
              </div>
            )}
          </nav>

          <Comments />

          {preview && (
            <Link href="/api/exit-preview">
              <button className={commonStyles.buttonOut} type="button">
                Sair do modo Preview
              </button>
            </Link>
          )}
        </aside>
      </main>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'post'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();

  const { slug } = params;

  const response = await prismic.getByUID('post', String(slug), {
    ref: previewData?.ref || null,
  });

  const prevPost = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.first_publication_date]',
    }
  );

  const nextPost = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.last_publication_date desc]',
    }
  );

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
      navigation: {
        nextPost: prevPost?.results,
        prevPost: nextPost?.results,
      },
      preview,
    },
  };
};
