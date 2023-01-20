import type { ComponentProps } from 'react';

const icons = {
  check: 'check.svg',
  star: 'star.svg',
  logo: 'qunomedical-logo.svg',
  location: 'location.svg',
  heart: 'heart.svg',
} as const;

type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
} & ComponentProps<'img'>;

export function Icon({ name, ...rest }: IconProps) {
  return (
    <img
      data-icon={name}
      src={`/images/${icons[name]}`}
      alt={`${name} icon`}
      {...rest}
    />
  );
}
