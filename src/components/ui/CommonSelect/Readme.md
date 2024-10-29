# CommonSelect Component

Компонент `CommonSelect` — це кастомізований компонент вибору (select) на основі `@mui/material`, який дозволяє створювати адаптивний елемент з індивідуальними стилями.

## Властивості компонента

- **`label`**: (тип `string`, обов'язковий) — Ярлик, який відображається у полі вибору.

- **`options`**: (тип `string[]`, обов'язковий) — Список значень, що доступні для вибору.

- **`size`**: (тип `{ mobile: string; tablet: string; laptop: string }`, обов'язковий) — Розміри для різних екранів: `mobile`, `tablet`, `laptop`. Значення вказуються у форматі ширини (`px`, `%` тощо).

- **`outlineColor`**: (тип `string`, не обов'язковий) — Колір обведення при фокусі (за замовчуванням `var(--input-text)`).

- **`value`**: (тип `string`, не обов'язковий) — Поточне значення вибраного елемента.

- **`onChange`**: (тип `(event: SelectChangeEvent<string>) => void`, обов'язковий) — Обробник події зміни значення.

## Приклад використання

```typescript
import CommonSelect from "./CommonSelect";

const options = ["Option 1", "Option 2", "Option 3"];

function App() {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as string);
  };

  return (
    <CommonSelect
      label="Виберіть опцію"
      options={options}
      size={{ 
        mobile: "0", // 0 - якщо не відображається на даному екрані
        tablet: "460px", 
        laptop: "280px" }}
      outlineColor="blue"
      value={selectedOption}
      onChange={handleChange}
    />
  );
}

export default App;


## Опис стилів
Компонент підтримує стилізацію для різних екранів: mobile, tablet та laptop.
Колір обведення при фокусі можна змінювати за допомогою властивості outlineColor.
Використовується кастомний стиль для колірної схеми var(--input-text), 
який можна визначити у CSS для гнучкої адаптації до теми вашого додатку.
Налаштування
Компонент підтримує базові стилі за допомогою @mui/material та кастомні змінні CSS. Ви можете налаштовувати кольори та стилі обведення через CSS змінні, а також за допомогою налаштувань компонента.

## Вимоги
@mui/material для компонентів та стилів
React 18+ для коректної роботи з типами та подіями
Ліцензія
Цей компонент розповсюджується під MIT ліцензією. Ви можете вільно використовувати та змінювати його у своїх проєктах.
