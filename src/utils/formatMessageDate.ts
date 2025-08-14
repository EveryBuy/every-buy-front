const formatMessageDate = (dateString: string): string => {
  const date = new Date(dateString + "Z");

  const day = date.toLocaleDateString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "numeric",
  });

  const year = date.toLocaleDateString("uk-UA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
  });

  // Отримуємо номер місяця (1-12) і конвертуємо в індекс масиву (0-11)
  const monthNumber =
    Number.parseInt(
      date.toLocaleDateString("uk-UA", {
        timeZone: "Europe/Kyiv",
        month: "numeric",
      })
    ) - 1;

  const months = [
    "січ",
    "лют",
    "бер",
    "квіт",
    "трав",
    "черв",
    "лип",
    "серп",
    "вер",
    "жовт",
    "лист",
    "груд",
  ];

  const month = months[monthNumber];

  return `${day} ${month} ${year}`;
};

const formatMessageTime = (dateString: string): string => {
  const date = new Date(dateString + "Z");

  // Використовуємо toLocaleTimeString для отримання часу в київській зоні
  const timeString = date.toLocaleTimeString("uk-UA", {
    timeZone: "Europe/Kyiv",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return timeString;
};

// Додаткова функція для отримання повної дати та часу
const formatMessageDateTime = (dateString: string): string => {
  const dateFormatted = formatMessageDate(dateString);
  const timeFormatted = formatMessageTime(dateString);

  return `${dateFormatted} о ${timeFormatted}`;
};

// Функція для перевірки, чи дата сьогоднішня (в київському часі)
const isToday = (dateString: string): boolean => {
  const date = new Date(dateString + "Z");
  const today = new Date();

  const dateInKyiv = date.toLocaleDateString("uk-UA", {
    timeZone: "Europe/Kyiv",
  });

  const todayInKyiv = today.toLocaleDateString("uk-UA", {
    timeZone: "Europe/Kyiv",
  });

  return dateInKyiv === todayInKyiv;
};

// Функція для відображення "сьогодні" або дати
const formatMessageDateSmart = (dateString: string): string => {
  if (isToday(dateString)) {
    return "сьогодні";
  }
  return formatMessageDate(dateString);
};

export {
  formatMessageDate,
  formatMessageTime,
  formatMessageDateTime,
  formatMessageDateSmart,
  isToday,
};
