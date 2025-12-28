import Image from "next/image";
import styles from "./DeliveryMethodsPreview.module.scss";
import NovaPostIcon from "@/assets/Svg/nova_post.svg";
import UkrPostIcon from "@/assets/Svg/ukr_post.svg";
import MeestIcon from "@/assets/Svg/icon-meest.svg";
import OtherIcon from "@/assets/Svg/icon-parcel.svg";

type Props = {
  methods?: string[];
};

const deliveryMap: Record<
  string,
  { label: string; icon: any }
> = {
  NOVA_POST: {
    label: "Нова пошта",
    icon: NovaPostIcon,
  },
  UKR_POST: {
    label: "Укрпошта",
    icon: UkrPostIcon,
  },
  Meest_Express: {
    label: "Meest Express",
    icon: MeestIcon,
  },
  Other: {
    label: "Інше",
    icon: OtherIcon,
  },
};

const DeliveryMethodsPreview: React.FC<Props> = ({ methods = [] }) => {

  return (
    <div className={styles.deliveryBlock}>
      <p className={styles.deliveryTitle}>Спосіб доставки</p>

      <ul className={styles.deliveryList}>
        {methods.map((method) => {
          const item = deliveryMap[method];

          if (!item) return null;

          return (
            <li key={method} className={styles.deliveryItem}>
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
              />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DeliveryMethodsPreview;
