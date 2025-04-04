
import { WeatherData, getWeatherIcon, formatTimestamp } from "@/services/weatherService";
import { Thermometer, Droplets, Wind, Compass } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const isDay = new Date().getHours() > 6 && new Date().getHours() < 18;
  
  return (
    <div className="animate-fade-in bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 shadow-lg text-white">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center">
            <h2 className="text-3xl md:text-4xl font-bold">{data.name}</h2>
            <span className="text-base ml-2">{data.sys.country}</span>
          </div>
          <p className="text-sm opacity-80">
            {new Date(data.dt * 1000).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center">
          <img
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-16 h-16 md:w-24 md:h-24"
          />
          <div className="ml-2">
            <h1 className="text-4xl md:text-6xl font-bold">
              {Math.round(data.main.temp)}°C
            </h1>
            <p className="text-lg capitalize">{data.weather[0].description}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg">
          <Thermometer className="h-6 w-6 mr-2 text-amber-300" />
          <div>
            <p className="text-sm opacity-75">Feels Like</p>
            <p className="text-xl font-semibold">{Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg">
          <Droplets className="h-6 w-6 mr-2 text-blue-300" />
          <div>
            <p className="text-sm opacity-75">Humidity</p>
            <p className="text-xl font-semibold">{data.main.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg">
          <Wind className="h-6 w-6 mr-2 text-blue-200" />
          <div>
            <p className="text-sm opacity-75">Wind Speed</p>
            <p className="text-xl font-semibold">{Math.round(data.wind.speed)} m/s</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg">
          <Compass className="h-6 w-6 mr-2 text-gray-300" />
          <div>
            <p className="text-sm opacity-75">Pressure</p>
            <p className="text-xl font-semibold">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between text-sm opacity-80">
        <div>
          <span>Sunrise: {formatTimestamp(data.sys.sunrise)}</span>
        </div>
        <div>
          <span>Sunset: {formatTimestamp(data.sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
