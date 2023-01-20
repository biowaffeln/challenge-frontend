import { fireEvent, render, screen } from '@testing-library/react';
import Doctors from 'pages/doctors';
import type { Doctor } from 'types/doctor';

jest.mock('next/router', () => require('next-router-mock'));

const testData: Doctor[] = [
  {
    name: 'Doctor 1',
    city: '',
    country: '',
    qunoScoreNumber: 8,
    ratingsAverage: 4.5,
    treatmentsLastYear: 2490,
    yearsExperience: 15,
    basePrice: 3000,
    avatarUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
    qunoScoreText: 'Good',
    slug: 'doctor-1',
  },
  {
    name: 'Doctor 2',
    city: '',
    country: '',
    qunoScoreNumber: 6,
    ratingsAverage: 4.5,
    treatmentsLastYear: 2490,
    yearsExperience: 15,
    basePrice: 2000,
    avatarUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
    qunoScoreText: 'Good',
    slug: 'doctor-2',
  },
  {
    name: 'Doctor 3',
    city: '',
    country: '',
    qunoScoreNumber: 7,
    ratingsAverage: 4.5,
    treatmentsLastYear: 2490,
    yearsExperience: 15,
    basePrice: 1000,
    avatarUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
    qunoScoreText: 'Good',
    slug: 'doctor-3',
  },
];

describe('Doctors page', () => {
  it('should initially sort the doctors by score', async () => {
    render(<Doctors data={testData} />);

    const headings = screen.getAllByRole('heading');

    const [doctor1Index, doctor2Index, doctor3Index] = testData.map((doctor) =>
      headings.findIndex((heading) => heading.textContent === doctor.name),
    );

    // expected order:
    // 1 -> 3 -> 2
    expect(doctor1Index).toBeLessThan(doctor3Index);
    expect(doctor3Index).toBeLessThan(doctor2Index);
  });

  it('should sort the doctors by price after click', async () => {
    render(<Doctors data={testData} />);

    fireEvent.click(screen.getByText('Lowest Price'));

    const headings = screen.getAllByRole('heading');
    const [doctor1Index, doctor2Index, doctor3Index] = testData.map((doctor) =>
      headings.findIndex((heading) => heading.textContent === doctor.name),
    );

    // expected order:
    // 3 -> 2 -> 1
    expect(doctor3Index).toBeLessThan(doctor2Index);
    expect(doctor2Index).toBeLessThan(doctor1Index);
  });
});
