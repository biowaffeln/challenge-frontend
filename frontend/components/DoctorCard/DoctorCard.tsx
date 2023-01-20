import Link from 'next/link';
import { Icon } from 'components/Icon';
import styles from './DoctorCard.module.css';
import type { Doctor } from 'types/doctor';

type DoctorCardProps = {
  data: Doctor;
};

export const DoctorCard = ({ data }: DoctorCardProps) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.profilePicture}
        src={data.avatarUrl}
        alt={data.name}
      />
      <div>
        <p className={styles.kicker}>hair transplant</p>
        <h3 className={styles.heading}>{data.name}</h3>
        <p className={styles.location}>
          <Icon name="location" />
          {data.city}, {data.country}
        </p>
      </div>
      <div className={styles.score}>
        <div className={styles.scoreNumber}>{data.qunoScoreNumber}</div>
        <p className={styles.scoreText}>{data.qunoScoreText}</p>
        <p className={styles.scoreLabel}>QunoScore</p>
      </div>

      <ul className={styles.info}>
        <li>
          <Icon name="star" />
          <span className={styles.ratingsAverage}>
            {data.ratingsAverage.toFixed(1)}
          </span>
          <span className={styles.reviews}>(190 reviews)</span>
        </li>
        <li>
          <Icon name="check" />
          <span>{data.treatmentsLastYear} treatments last year</span>
        </li>
        <li>
          <Icon name="check" />
          {data.yearsExperience} years of experience
        </li>
      </ul>

      <div className={styles.price}>
        <p>starting from</p>
        <p className={styles.priceAmount}>
          {Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(data.basePrice)}
        </p>
      </div>

      <div>
        <Link href={data.slug} className={styles.action}>
          see doctor profile
        </Link>
      </div>
    </div>
  );
};
