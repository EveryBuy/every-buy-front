import location from "./location";

export default interface announcementType {
  description: string;
  location: location;
  delivery: string[];
  nameUkr: string;
  online: boolean;
  linkToAllAdvert: string;
  publicDate: string;
  cost: number;
}
