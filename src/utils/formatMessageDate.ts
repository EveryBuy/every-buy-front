// const formatMessageDate = (dateString: string): string => {
//   const date = new Date(dateString);
//
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//
//   return `${day}.${month}.${year}`;
// };

const formatMessageDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const year = date.getFullYear();
  const months = [
    "січ", "лют", "бер", "квіт", "трав", "черв", "лип", "серп", "вер", "жовт", "лист", "груд"
  ];
  const month = months[date.getMonth()];

  return `${day} ${month} ${year}`;
};


const formatMessageTime = (dateString: string): string => {
  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export {formatMessageDate, formatMessageTime};