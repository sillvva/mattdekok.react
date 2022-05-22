import React from 'react';
import ratingStyles from './Ratings.module.scss'
import Page from '../page';

interface RatingColumnBreakpoints {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
}

interface RatingSectionProps {
  name: string;
  columns: RatingColumnBreakpoints;
}

const RatingSection = (props: React.PropsWithChildren<RatingSectionProps>) => {
  const colClasses = [
    ...(props.columns.sm ? ['sm:block'] : []),
    ...(props.columns.md ? ['md:block'] : []),
    ...(props.columns.xl ? ['xl:block'] : []),
    ...(props.columns.lg ? ['lg:block'] : []),
    ...(props.columns['2xl'] ? ['2xl:block'] : [])
  ];

  return (
    <Page.Section className="sm:block md:block lg:block xl:block 2xl:block">
      <h2 className={ratingStyles.Header}>
        {props.name}
      </h2>
      <div className={ratingStyles.Columns}>
        {colClasses.map((col, c) => (
          <React.Fragment key={c}>
            <div className={[ratingStyles.Column, c > 0 && `hidden ${col}`].join(' ')}>
              <strong>Skills</strong>
            </div>
            <div className={[ratingStyles.Column, c > 0 && `hidden ${col}`].join(' ')}>
              <strong>Rating</strong>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={ratingStyles.Body}>
        {props.children}
      </div>
    </Page.Section>
  )
}

interface RatingItemProps {
  name: string;
  rating: number;
}

const RatingItem = (props: React.PropsWithChildren<RatingItemProps>) => {
  return (
    <div className={ratingStyles.Entry}>
      <div className={ratingStyles.EntryRow}>
        <div className={ratingStyles.EntryCol}>
          {props.name}
        </div>
        <div className={ratingStyles.EntryCol}>
          <RatingStars rating={props.rating} />
        </div>
      </div>
    </div>
  )
}

interface RatingStarsProps {
  rating: number;
}

const RatingStars = (props: React.PropsWithChildren<RatingStarsProps>) => {
  const getStars = () => {
    const max = 5;
    let full = Math.floor(props.rating);
    let half = full === props.rating ? 0 : 1;
    let empty = max - full - half;
    if (props.rating - full !== 0) {
      if (props.rating - full >= 3 / 4) {
        half = 0;
        full += 1;
      } else if (props.rating - full < 1 / 4) {
        half = 0;
        empty += 1;
      }
    }
  
    return [
      ...Array(full).fill("mdi-star"),
      ...Array(half).fill("mdi-star-half-full"),
      ...Array(empty).fill("mdi-star-outline"),
    ];
  };

  return (
    <div className={['rating rating-zoom text-right'].join(' ')}>
      {getStars().map((star, s) => <i className={['mdi', star].join(' ')} key={s}></i>)}
    </div>
  )
}

const Rating = {
  Section: RatingSection,
  Item: RatingItem
}

export default Rating;