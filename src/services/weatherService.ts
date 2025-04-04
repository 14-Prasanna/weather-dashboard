
const API_KEY = "66729cc203891e38d4c68913241e5b8f";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
  };
}

export const fetchCurrentWeather = async (
  city: string = "London"
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const fetchWeatherForecast = async (
  city: string = "London"
): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    throw error;
  }
};

export const getWeatherIcon = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getBackgroundClass = (weatherMain: string, isDay: boolean = true): string => {
  const timeClass = isDay ? "from-blue-400 to-blue-200" : "from-indigo-900 to-blue-900";
  
  switch(weatherMain.toLowerCase()) {
    case "clear":
      return isDay ? "from-amber-100 to-sky-300" : "from-blue-900 to-indigo-950";
    case "clouds":
      return isDay ? "from-slate-300 to-blue-300" : "from-slate-800 to-blue-900";
    case "rain":
    case "drizzle":
      return isDay ? "from-slate-400 to-blue-400" : "from-slate-800 to-blue-950";
    case "thunderstorm":
      return isDay ? "from-slate-600 to-indigo-400" : "from-slate-900 to-indigo-950";
    case "snow":
      return isDay ? "from-slate-100 to-blue-100" : "from-slate-700 to-blue-900";
    case "mist":
    case "fog":
    case "haze":
      return isDay ? "from-gray-300 to-blue-200" : "from-gray-800 to-blue-900";
    default:
      return timeClass;
  }
};
