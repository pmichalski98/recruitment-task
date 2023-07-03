import { FormEvent, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FormItem from "./components/FormItem.tsx";
import FormGroup from "./components/FormGroup.tsx";
import InputWrapper from "./components/InputWrapper.tsx";
import Button from "./components/Button.tsx";

function App() {
  const [usersInput, setUsersInput] = useState(0);
  const [averageCourse, setAverageCourse] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "https://api.nbp.pl/api/exchangerates/rates/a";
  const IMG_URL = "https://purecatamphetamine.github.io/country-flag-icons/3x2";

  function valueAfterSwap(afterDecimal = 2) {
    return (averageCourse! * usersInput).toFixed(afterDecimal);
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
    <main className="min-h-screen flex justify-center items-center">
      <section className="bg-gray-100">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-6 rounded-lg p-8"
        >
          <FormGroup>
            <FormItem imgUrl={`${IMG_URL}/EU.svg`} currency={"EUR"} />
            <InputWrapper>
              {/* Jakby było więcej inputów to bym również osobny komponent */}
              <input
                onChange={(e) => setUsersInput(Number(e.target.value))}
                value={usersInput.toFixed(2)}
                className="h-full focus:outline-blue-400 pr-4 text-end font-medium text-lg"
                type="number"
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <FormItem imgUrl={`${IMG_URL}/PL.svg`} currency={"PLN"} />
            <InputWrapper>
              <input
                readOnly
                className="h-full focus:outline-blue-400 pr-4 text-end font-medium text-lg"
                value={averageCourse ? valueAfterSwap() : "0.00"}
                type={"number"}
              />
            </InputWrapper>
          </FormGroup>
          {averageCourse && (
            <div className="self-end mt-6 flex flex-col items-end ">
              <div className="flex items-center  gap-1">
                <AiOutlineInfoCircle size={23} />
                <p>1 EUR = {averageCourse.toFixed(4)} PLN</p>
              </div>
              <p className="text-sm">
                1 PLN = {(1 / averageCourse).toFixed(4)} EUR
              </p>
            </div>
          )}
          {/* Jakby było więcej przycisków to bym stworzył osobny komponent */}
          <Button disabled={isLoading}>
            {isLoading ? <ClipLoader color={"white"} /> : "Sprawdź kurs"}
          </Button>
        </form>
        {averageCourse && (
          <p className="pl-10 pb-10 text-sm">
            Za {usersInput.toFixed(2)} EUR otrzymasz{" "}
            <strong>{valueAfterSwap()} PLN</strong>
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
