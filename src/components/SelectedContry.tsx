
interface SelectedContryProps {
  fromCurrency: string;
  setFromCurrency: (currency: string) => void;
  titles: {
    [key: string]: string;
  };
}

export default function SelectedContry({ fromCurrency, setFromCurrency, titles }: SelectedContryProps) {
  return (
    <select
      value={fromCurrency}
      onChange={(e) => {
        setFromCurrency(e.target.value);
      }}
      className="w-full bg-transparent outline-none"
    >
      {Object.entries(titles).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
}