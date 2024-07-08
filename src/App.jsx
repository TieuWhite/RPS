import { useEffect, useState } from "react";

const api = {
  key: "f341ec6e9a9889e3a1c763553206f37b",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setWeatherInfo(JSON.stringify(data));
          setErrorMes("");
        } else {
          setErrorMes(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
    console.log(searchCity);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
        <button>search</button>
      </form>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          {" "}
          {errorMes ? (
            <div style={{ color: "red" }}>{errorMes}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
