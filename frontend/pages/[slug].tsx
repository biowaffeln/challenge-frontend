import { getDoctorBySlug, getDoctorsList } from 'utils/api';
import { Nav } from 'components/Nav';
import { Icon } from 'components/Icon';
import styles from './[slug].module.css';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

// --- server functions ---

export const getStaticPaths = async () => {
  const doctors = await getDoctorsList();

  return {
    paths: [
      ...doctors.map((doctor) => ({
        params: { slug: doctor.slug },
      })),
    ],
    fallback: false,
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const slug = ctx.params?.slug as string;
  const data = await getDoctorBySlug(slug);

  return {
    props: { data },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// --- page component ---

export default function DoctorDetailPag({ data }: Props) {
  return (
    <>
      <Nav />
      <div
        className={styles.coverPicture}
        style={{
          backgroundImage: `url(${data.avatarUrl})`,
        }}
        role="img"
      />
      <section className={styles.content}>
        <p className={styles.kicker}>Hair Transplant</p>
        <h1 className={styles.heading}>{data.name}</h1>
        <p className={styles.location}>
          <Icon name="location" />
          <span>
            {data.city}, {data.country}
          </span>
        </p>

        <div className={styles.scoreContainer}>
          <div className={styles.scoreCount}>{data.qunoScoreNumber}</div>
          <div>
            <p className={styles.scoreText}>{data.qunoScoreText}</p>
            <p className={styles.scoreLabel}>Qunoscore</p>
          </div>
        </div>

        <ul className={styles.info}>
          <li>
            <Icon name="star" />
            <span>
              <strong>{data.ratingsAverage.toFixed(1)}</strong> (190 reviews)
            </span>
          </li>
          <li>
            <Icon name="heart" />
            <span>
              <strong>97%</strong> would recommend
            </span>
          </li>
          <li>
            <Icon name="check" />
            <span>High demand doctor</span>
          </li>
          <li>
            <Icon name="check" />
            Practicing since {new Date().getFullYear() - data.yearsExperience}
          </li>
          <li>
            <Icon name="check" />
            <span>
              Package from{' '}
              <strong>
                {Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(data.basePrice)}
              </strong>
            </span>
          </li>
        </ul>
        <div className={styles.actions}>
          <a className={styles.secondaryAction}>Get consultation</a>
          <a className={styles.primaryAction}>Book appointment</a>
        </div>
      </section>
    </>
  );
}
