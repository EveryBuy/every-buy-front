import Image from "next/image";
import styles from "./LocationPreview.module.scss";
import LocationIcon from "@/assets/Svg/location_black.svg";

type Props = {
  location?: string;
};

const LocationPreview: React.FC<Props> = ({ location }) => {
  const [city, region] = location?.split(",") || [];

  return (
    <div className={styles.cityBlock}>
      <p className={styles.title}>Місцезнаходження</p>
      <div className={styles.cityBlockWrapper}>
        <Image src={LocationIcon} alt="location" width={30} height={30} />
        <span>
          <span
            style={{
              display: "block",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {city?.trim()}
          </span>
          <span
            style={{
              display: "block",
              fontSize: 16,
              color: "#777676",
            }}
          >
            {region?.trim()}
          </span>
        </span>
      </div>
    </div>
  );
};

export default LocationPreview;
