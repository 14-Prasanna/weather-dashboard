
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import WeatherDetails from "./WeatherDetails";
import SearchLocation from "./SearchLocation";
import { 
  fetchCurrentWeather, 
  fetchWeatherForecast, 
  WeatherData, 
  ForecastData,
  getBackgroundClass
} from "@/services/weatherService";

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [city, setCity] = useState<string>("London");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch both current weather and forecast data
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchWeatherForecast(cityName)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try another city.");
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try another city.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  // Determine background gradient based on weather condition
  const backgroundClass = currentWeather 
    ? getBackgroundClass(currentWeather.weather[0].main, 
        new Date().getHours() > 6 && new Date().getHours() < 18)
    : "from-blue-400 to-blue-600";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md">Weather Dashboard</h1>
          <SearchLocation onSearch={handleSearch} />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <p>{error}</p>
            <button 
              onClick={() => fetchWeatherData("London")}
              className="mt-4 bg-white bg-opacity-25 hover:bg-opacity-35 px-4 py-2 rounded-lg transition-all"
            >
              Try Default City
            </button>
          </div>
        ) : (
          currentWeather && forecast && (
            <>
              <CurrentWeather data={currentWeather} />
              <WeatherForecast data={forecast} />
              <WeatherDetails data={currentWeather} />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
