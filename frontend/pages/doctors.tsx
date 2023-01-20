import { useRouter } from 'next/router';
import { match } from 'ts-pattern';
import { getDoctorsList } from 'utils/api';
import { Nav } from 'components/Nav';
import { DoctorCard } from 'components/DoctorCard';
import { Icon } from 'components/Icon';
import styles from './doctors.module.css';
import type { InferGetStaticPropsType } from 'next';

// --- sort utils ---

const sortBy = {
  SCORE: 'score',
  REVIEWS: 'reviews',
  PRICE: 'price',
} as const;

type SortCategory = (typeof sortBy)[keyof typeof sortBy];

const parseSortParam = (query: string): SortCategory => {
  if (Object.values(sortBy).includes(query as SortCategory)) {
    return query as SortCategory;
  }

  return sortBy.SCORE;
};

// --- server functions ---

export const getStaticProps = async () => {
  const data = await getDoctorsList();

  return {
    props: { data },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// --- page component ---

export default function DoctorsPage({ data }: Props) {
  const router = useRouter();

  const setSortParam = (category: SortCategory): void => {
    router.push({ query: { sortBy: category } }, undefined, {
      shallow: true,
    });
  };

  const sortCategory: SortCategory = parseSortParam(
    router.query.sortBy as string,
  );

  const sortedData = [...data].sort((a, b) =>
    match(sortCategory)
      .with(sortBy.SCORE, () => b.qunoScoreNumber - a.qunoScoreNumber)
      .with(sortBy.REVIEWS, () => b.ratingsAverage - a.ratingsAverage)
      .with(sortBy.PRICE, () => a.basePrice - b.basePrice)
      .exhaustive(),
  );

  return (
    <div>
      <Nav />
      <div className={styles.hero}>
        <h1>FUE Hair Transplant Clinics</h1>
        <ul>
          <li>
            <Icon name="check" /> Only professionally-vetted doctors
          </li>
          <li>
            <Icon name="check" /> Personal support service
          </li>
          <li>
            <Icon name="check" /> Satisfaction & price match guarantee
          </li>
        </ul>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => setSortParam(sortBy.SCORE)}
          className={styles.button}
          data-active={sortCategory === sortBy.SCORE}
        >
          Best Qunoscore
        </button>
        <button
          onClick={() => setSortParam(sortBy.REVIEWS)}
          className={styles.button}
          data-active={sortCategory === sortBy.REVIEWS}
        >
          Best Reviews
        </button>
        <button
          onClick={() => setSortParam(sortBy.PRICE)}
          className={styles.button}
          data-active={sortCategory === sortBy.PRICE}
        >
          Lowest Price
        </button>
      </div>
      <div className={styles.doctorsList}>
        {sortedData.map((doctor) => (
          <DoctorCard key={doctor.slug} data={doctor} />
        ))}
      </div>
    </div>
  );
}
