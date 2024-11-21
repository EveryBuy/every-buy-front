export default interface CommonModalProps {
  contentClassName?: string;
  onClose: (prop: boolean) => void;
  open?: boolean;
  children: React.ReactNode;
}
