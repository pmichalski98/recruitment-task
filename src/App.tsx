import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import FormItem from "./components/FormItem.tsx";
import FormGroup from "./components/FormGroup.tsx";
import InputWrapper from "./components/InputWrapper.tsx";
import Input from "./components/Input.tsx";
import { AiOutlineInfoCircle } from "react-icons/ai";

export interface Currencies {
  currency: string;
  code: string;
  mid: number;
}
function App() {
  const [firstInputValue, setFirstInputValue] = useState("0.00");
  const [secondInputValue, setSecondInputValue] = useState("0.00");
  const [averageCourse, setAverageCourse] = useState<null | number>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState<Currencies[]>([]);
  const [selectedCurrencyRate, setSelectedCurrencyRate] = useState<number>();

  const API_URL = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json";

  async function getAllCurrencies() {
    const res = await axios.get(API_URL);
    const currencies: Currencies[] = res.data[0].rates;
    currencies.sort((a, b) => (a.code > b.code ? 1 : -1));
    setCurrencies(currencies);
  }
  useEffect(() => {
    getAllCurrencies();
  }, []);

  function exchangeCurrency(inputValue, inputNumber) {
    if (inputNumber === 1) {
      setSecondInputValue(inputValue * selectedCurrencyRate);
    } else {
      setFirstInputValue(inputValue / selectedCurrencyRate);
    }
  }

  const handleFirstOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
      setFirstInputValue(input);
    }

    exchangeCurrency(input, 1);
  };

  const handleSecondOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
      setSecondInputValue(input);
    }

    exchangeCurrency(input, 2);
  };

  function valueAfterSwap() {
    if (isNaN(parseFloat(firstInputValue))) setAverageCourse(null);
    return (averageCourse! * parseFloat(firstInputValue)).toFixed(2);
  }
  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    let avgCourse: number;
    try {
      const res = await axios.get(`${API_URL}/eur`);
      avgCourse = res.data.rates[0].mid;
      setAverageCourse(avgCourse);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-5xl  font-medium mb-20">
        Kalkulator wielowalutowy
      </h1>
      <section className="bg-gray-100">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-6 rounded-lg p-8"
        >
          <FormGroup>
            <FormItem
              currencies={currencies}
              setSelectedCurrency={setSelectedCurrencyRate}
            />
            <InputWrapper>
              <Input
                className="h-full focus:outline-blue-400 pr-4 text-end font-medium text-lg"
                value={firstInputValue}
                onChange={handleFirstOnChange}
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <div className=" p-6 flex gap-4 items-center">
              <span className="font-medium text-xl">PLN</span>
            </div>
            <InputWrapper>
              <Input
                onChange={handleSecondOnChange}
                value={secondInputValue}
                type={"text"}
              />
            </InputWrapper>
          </FormGroup>
          {selectedCurrencyRate && (
            <div className="self-end mt-6 flex flex-col items-end ">
              <div className="flex items-center  gap-1">
                <AiOutlineInfoCircle size={23} />
                <p>1 aktualna waluta = {selectedCurrencyRate} PLN</p>
              </div>
              <p className="text-sm">
                1 PLN = {(1 / selectedCurrencyRate).toFixed(4)} aktualna waluta
              </p>
            </div>
          )}
        </form>
        {/*{averageCourse && (*/}
        {/*  <p className="pl-10 pb-10 text-sm">*/}
        {/*    Za {firstInputValue} EUR otrzymasz{" "}*/}
        {/*    <strong>{valueAfterSwap()} PLN</strong>*/}
        {/*  </p>*/}
        {/*)}*/}
      </section>
    </main>
  );
}

export default App;
