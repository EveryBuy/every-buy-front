export default interface BannerItemType {
  label: string;
  title: string;
  condition: string;
  price: string;
  buttonName: string;
  backgroundImages: {
    mobile1x: string;
    mobile2x: string;
    laptop1x: string;
    laptop2x: string;
  };
}
