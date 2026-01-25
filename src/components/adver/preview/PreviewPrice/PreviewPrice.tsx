import styles from "./PreviewPrice.module.scss";

type Props = {
  price?: string | null;
  isNegotiable?: boolean;
  priceType?: string;
};

const PreviewPrice: React.FC<Props> = ({ price, isNegotiable, priceType }) => {
  if (priceType === "free") {
    return (
      <div className={styles.price}>
        <h4>Безкоштовно</h4>
      </div>
    );
  }

  if (!price && !isNegotiable) return null;

  return (
    <div className={styles.price}>
      <div>
        {price && <h3>{price} грн</h3>}
        {isNegotiable && <p>Ціна договірна</p>}
      </div>
    </div>
  );
};

export default PreviewPrice;
