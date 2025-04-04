
import { ForecastData, getWeatherIcon, formatDate } from "@/services/weatherService";

interface WeatherForecastProps {
  data: ForecastData;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  // Group forecast data by day
  const dailyForecasts = data.list.reduce((acc: { [date: string]: typeof data.list[0] }, item) => {
    const date = item.dt_txt.split(' ')[0];
    // Take the forecast for midday (closest to 12:00) as representative for the day
    if (!acc[date] || Math.abs(new Date(item.dt_txt).getHours() - 12) < Math.abs(new Date(acc[date].dt_txt).getHours() - 12)) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const forecastArray = Object.values(dailyForecasts).slice(0, 5); // Get up to 5 days

  return (
    <div className="mt-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {forecastArray.map((day, index) => (
          <div key={index} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 text-center text-white">
            <p className="font-medium">{formatDate(day.dt_txt)}</p>
            <img 
              src={getWeatherIcon(day.weather[0].icon)} 
              alt={day.weather[0].description} 
              className="mx-auto w-12 h-12"
            />
            <p className="font-bold text-xl">{Math.round(day.main.temp)}°C</p>
            <p className="text-xs capitalize">{day.weather[0].description}</p>
            <div className="text-xs mt-1 flex justify-between">
              <span>H: {Math.round(day.main.temp_max)}°</span>
              <span>L: {Math.round(day.main.temp_min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
