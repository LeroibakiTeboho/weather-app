import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import toast from "react-hot-toast";
import { Location } from "@/types/weather";

export default function SearchBar({
  onSelect,
}: {
  onSelect: (location: Location) => void;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      axios
        .get("/api/locations", { params: { q: debouncedQuery } })
        .then((res) => setSuggestions(res.data))
        .catch(() => toast.error("Failed to fetch locations"));
    }
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-md mx-auto ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="w-full p-3 rounded-full border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 font-bold"
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200">
          {suggestions.map((location, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(location);
                setQuery("");
                setSuggestions([]);
              }}
              className="p-3 hover:bg-gray-100 cursor-pointer"
            >
              {location.name}, {location.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
