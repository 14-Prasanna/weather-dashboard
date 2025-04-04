
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchLocationProps {
  onSearch: (city: string) => void;
}

const SearchLocation = ({ onSearch }: SearchLocationProps) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2 mb-6">
      <Input
        type="text"
        placeholder="Search city..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-white bg-opacity-25 backdrop-blur-sm border-white border-opacity-25 text-white placeholder:text-white placeholder:text-opacity-60"
      />
      <Button type="submit" size="icon" variant="outline" className="border-white border-opacity-25 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-white hover:bg-opacity-30">
        <Search className="h-4 w-4 text-white" />
      </Button>
    </form>
  );
};

export default SearchLocation;
