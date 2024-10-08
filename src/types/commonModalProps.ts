export default interface CommonModalProps {
  contentClassName?: string;
  onClose: (prop: boolean) => void;
  children: React.ReactNode;
}
