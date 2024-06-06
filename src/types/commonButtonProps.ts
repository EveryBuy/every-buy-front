export default interface CommonButtonProps {
  type: "submit" | "reset" | "button";
  title: string;
  color: "transparent" | "light-yellow" | "yellow";
  className?: string;
}
