import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=fa5a52cc2846e08cb7d46c47c4a0b442`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="bg-[url(./assets/sunset.jpg)] bg-cover bg-no-repeat bg-center h-screen">
      <div className="text-white flex flex-col justify-center items-center mx-auto max-w-[600px]">
        <div className="pt-8 pb-4 w-[100%] text-center">
          <input
            type="text"
            className="rounded-full px-3 py-2 bg-transparent text-gray-50 border focus:ring-1 focus:ring-cyan-200 focus:outline-none placeholder:text-white w-[60%]
            "
            placeholder="Enter city name"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
          />
        </div>
        {data.name != undefined && (
          <div className="w-full p-4">
            <div className="flex items-center justify-center mt-24 mb-48">
              <div className="pr-16">
                <p className="text-2xl">{data.name ? data.name : null}</p>
                <h1 className="text-8xl font-semibold">
                  {data.main ? data.main.temp.toFixed() : null} °F
                </h1>
              </div>
              <p className="-rotate-90 ml-16 text-lg font-semibold">
                {data.weather ? data.weather[0].main : null}
              </p>
            </div>
            <div className="flex text-center justify-evenly py-3 bg-slate-600 rounded-md">
              <div className="">
                <p className="font-semibold text-xl pb-2">
                  {data.main ? data.main.feels_like.toFixed() : null} °F
                </p>
                <p>Fells Like</p>
              </div>
              <div className=" text-white">
                <p className="font-semibold text-xl pb-2">
                  {data.main ? data.main.humidity : null}%
                </p>
                <p>Humidity</p>
              </div>
              <div className="text-white">
                <p className="font-semibold text-xl pb-2">
                  {data.wind ? data.wind.speed : null} MPH
                </p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
