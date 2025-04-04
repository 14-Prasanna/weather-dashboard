
import { 
  Droplets, 
  Wind, 
  Gauge, 
  Thermometer, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Compass 
} from "lucide-react";
import { WeatherData } from "@/services/weatherService";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  return (
    <div className="mt-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-4">Weather Details</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DetailCard 
          icon={<Thermometer className="h-8 w-8 text-amber-300" />}
          title="Feels Like"
          value={`${Math.round(data.main.feels_like)}°C`}
          description="How the temperature feels to the human body"
        />
        
        <DetailCard 
          icon={<Droplets className="h-8 w-8 text-blue-300" />}
          title="Humidity"
          value={`${data.main.humidity}%`}
          description="Amount of water vapor in the air"
        />
        
        <DetailCard 
          icon={<Wind className="h-8 w-8 text-blue-200" />}
          title="Wind"
          value={`${Math.round(data.wind.speed)} m/s`}
          description={`Direction: ${data.wind.deg}°`}
        />
        
        <DetailCard 
          icon={<Gauge className="h-8 w-8 text-gray-300" />}
          title="Pressure"
          value={`${data.main.pressure} hPa`}
          description="Atmospheric pressure"
        />
        
        <DetailCard 
          icon={<ArrowUp className="h-8 w-8 text-red-300" />}
          title="Max Temp"
          value={`${Math.round(data.main.temp_max)}°C`}
          description="Maximum temperature"
        />
        
        <DetailCard 
          icon={<ArrowDown className="h-8 w-8 text-blue-300" />}
          title="Min Temp"
          value={`${Math.round(data.main.temp_min)}°C`}
          description="Minimum temperature"
        />
      </div>
    </div>
  );
};

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const DetailCard = ({ icon, title, value, description }: DetailCardProps) => (
  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-white">
    <div className="flex items-center mb-2">
      {icon}
      <h3 className="ml-2 font-semibold">{title}</h3>
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-xs opacity-75">{description}</p>
  </div>
);

export default WeatherDetails;
