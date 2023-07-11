import { Currencies } from "../App.tsx";

interface FormItemProps {
  currencies: Currencies[];
  setSelectedCurrency: React.Dispatch<
    React.SetStateAction<Currencies | undefined>
  >;
}
const FormItem = ({ currencies, setSelectedCurrency }: FormItemProps) => {
  function handleOnChange(e) {
    setSelectedCurrency(Number(e.target.value));
  }
  return (
    <div className=" p-6 flex gap-4 items-center">
      <select onChange={handleOnChange} name="currencies" id="currencies">
        {currencies.map((currency) => {
          return (
            <option key={currency.code} value={currency.mid}>
              {currency.code}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormItem;
