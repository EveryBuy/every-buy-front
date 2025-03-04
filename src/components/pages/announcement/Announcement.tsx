"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAdvertisementById } from "@/redux/advertisement/operations";
import { selectAdvertisementById } from "@/redux/advertisement/selectors";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { Contacts, Info, Seller, AnnouncementSlider, CommonPreloader, CustomSeparator } from "@/components";
import styles from "./Announcement.module.scss";
import { setHeaderAuthToken } from "@/utils/axios";

export default function Announcement() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id") ?? 0);

  const [isFetching, setIsFetching] = useState(true);

  const { advertisementById, loading } = useSelector((state: RootState) => ({
    advertisementById: selectAdvertisementById(state),
    loading: state.advertisement.isLoading,
  }));

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsFetching(true);
      const persistData = localStorage.getItem("persist:root");
      if (persistData) {
        const parsedPersistData = JSON.parse(persistData);
        const authToken = JSON.parse(parsedPersistData.token);

        if (authToken) {
          setHeaderAuthToken(authToken);
        } else {
          console.error("No token found in persist:root");
          setIsFetching(false);
          return;
        }
      } else {
        console.error("No persist data found in localStorage");
        setIsFetching(false);
        return;
      }

      try {
        await dispatch(getAdvertisementById(id)).unwrap();
      } catch (error) {
        console.error("Error during fetching:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (isFetching || loading) {
    return (
      <div className={styles.preloaderContainer}>
        <CommonPreloader sx={{ color: "#e5ff46" }} />
      </div>
    );
  }

  if (!advertisementById) {
    return (
      <div className={styles.container}>No advertisement data available</div>
    );
  }

  const creationDate = new Date(advertisementById.data.creationDate);
  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(creationDate);

  return (
    <>
      <div className={styles.breadcrumbsContainer}>
        <CustomSeparator
          category={{
            id: advertisementById.data.category.id,
            title: advertisementById.data.category.nameUkr,
            link: `/catalogy?categoryId=${advertisementById.data.category.id}`,
          }}
          topSubCategory={
            advertisementById.data.topSubCategory
              ? {
                id: advertisementById.data.topSubCategory.id,
                title: advertisementById.data.topSubCategory.subCategoryNameUkr,
                link: `/catalogy?categoryId=${advertisementById.data.category.id}&topSubCategoryId=${advertisementById.data.topSubCategory.id}`,
              }
              : null
          }
          lowSubCategory={
            advertisementById.data.lowSubCategory
              ? {
                id: advertisementById.data.lowSubCategory.id,
                title: advertisementById.data.lowSubCategory.subCategoryNameUkr,
                link: `/catalogy?categoryId=${advertisementById.data.category.id}&topSubCategoryId=${advertisementById.data.topSubCategory.id}&lowSubCategoryId=${advertisementById.data.lowSubCategory.id}`,
              }
              : null
          }
          title={advertisementById.data.title}
        />
      </div>

      <div className={styles.container}>
        <AnnouncementSlider images={advertisementById?.data?.photoUrls || []} />
        <Contacts
          contactsInfo={{
            publicDate: formattedDate,
            cost: advertisementById.data.price,
            delivery: advertisementById.data.deliveryMethods,
            title: advertisementById.data.title,
            section: advertisementById.data.section,
          }}
        />
        <Info
          articleInfo={{
            description: advertisementById.data.description,
            location: {
              city: advertisementById.data.city.cityName,
              region: advertisementById.data.city.region.regionName,
            },
            deliveryMethods: advertisementById.data.deliveryMethods,
          }}
        />
        <Seller
          sellerInfo={{
            imageUrl: advertisementById.data.userDto.photoUrl,
            nameUkr: advertisementById.data.userDto.fullName,
            online: advertisementById.data.isEnabled,
            linkToAllAdvert: `/seller/${advertisementById.data.userId}`,
          }}
        />
      </div>
    </>
  );
}
