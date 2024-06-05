export default interface CommonButtonProps {
  type: "submit" | "reset" | "button";
  title: string;
  color: "white" | "yellow" | "default";
  style?: React.CSSProperties;
}
