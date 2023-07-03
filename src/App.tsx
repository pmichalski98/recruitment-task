import { FormEvent, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AiOutlineInfoCircle } from "react-icons/ai";

function App() {
  const [usersInput, setUsersInput] = useState(0);
  const [averageCourse, setAverageCourse] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = "https://api.nbp.pl/api/exchangerates/rates/a";
  const imgUrl = "https://purecatamphetamine.github.io/country-flag-icons/3x2";
  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    let avgCourse: number;
    try {
      const res = await axios.get(`${apiUrl}/eur`);
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
          className="flex flex-col  rounded-lg p-8"
        >
          <div className="flex bg-white border-2 rounded  ">
            <div className=" p-6 flex gap-4 items-center">
              <img
                className="shadow rounded"
                width={50}
                height={50}
                alt="United States"
                src={`${imgUrl}/EU.svg`}
              />
              <span className="font-medium text-xl">EUR</span>
            </div>
            <div className="border-l-2 ">
              <input
                onChange={(e) => setUsersInput(Number(e.target.value))}
                value={usersInput.toFixed(2)}
                className="h-full  focus:outline-blue-400 pr-4 text-end font-medium text-lg"
                type="number"
                id="users"
              />
            </div>
          </div>
          <div className="flex bg-white border-2 rounded mt-6  ">
            <div className=" p-6 flex gap-4 items-center">
              <img
                className="shadow rounded"
                width={50}
                height={50}
                alt="United States"
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/PL.svg"
              />{" "}
              <span className="font-medium text-xl">PLN</span>
            </div>
            <div className="border-l-2 ">
              <input
                readOnly
                className="h-full focus:outline-blue-400 pr-4 text-end font-medium text-lg"
                value={
                  averageCourse ? (usersInput * averageCourse).toFixed(2) : 0
                }
                type={"number"}
              />
            </div>
          </div>
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
          <button
            disabled={isLoading}
            className="self-end min-w-[137px] mt-6 hover:opacity-80 transition bg-blue-700 text-white rounded px-6 py-2 text-lg "
          >
            {isLoading ? <ClipLoader color={"white"} /> : "Sprawdź kurs"}
          </button>
        </form>
        {averageCourse && (
          <p className="pl-10 pb-10 text-sm">
            Za {usersInput.toFixed(2)} EUR otrzymasz{" "}
            <strong>{(usersInput * averageCourse).toFixed(2)} PLN</strong>
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
