import styles from "../layouts/main/MainLayout.module.scss";

type MeDetailsProps = {
  name: string;
  value: string | number;
};

const MeDetails = (props: MeDetailsProps) => {
  return (
    <>
      <div className={styles.MeDetails__Name}>{props.name}:</div>
      <div className={styles.MeDetails__Value}>{props.value}</div>
    </>
  );
};

export default MeDetails;
