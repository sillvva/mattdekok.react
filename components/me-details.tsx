import React from 'react';
import styles from '../layouts/main/MainLayout.module.scss'

interface MeDetailsProps {
  name: string;
  value: string | number;
}

const MeDetails = (props: React.PropsWithChildren<MeDetailsProps>) => {
  return (
    <>
      <div className={styles.MeDetails__Name}>
        {props.name}:
      </div>
      <div className={styles.MeDetails__Value}>
        {props.value}
      </div>
    </>
  )
}

export default MeDetails;
