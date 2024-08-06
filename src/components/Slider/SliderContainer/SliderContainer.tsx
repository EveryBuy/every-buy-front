import { FC } from "react";
import { SliderComponent } from "../../../components";
import styles from "./SliderContainer.module.scss";

const SliderContainer: FC = () => {
  return (
    <section className={styles.sliderSection}>
      <SliderComponent />
    </section>
  );
};
export default SliderContainer;
