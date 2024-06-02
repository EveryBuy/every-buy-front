import sprite from "../../assets/img/icons.svg";

const CommonIcon = ({ id, className, width, height }) => {
  return (
    <>
      <svg className={className} width={width} height={height}>
        <use href={`${sprite}#${id}`}></use>
      </svg>
    </>
  );
};

export default CommonIcon;
