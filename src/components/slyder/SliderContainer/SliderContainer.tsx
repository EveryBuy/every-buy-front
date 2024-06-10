import SliderComponent from "../SliderComponent/SliderComponent";
import styles from "./SliderContainer.module.scss";

const SliderContainer = () => {
  return (
    <section className={styles.sliderSection}>
      <SliderComponent />
    </section>
  );
};

export default SliderContainer;
