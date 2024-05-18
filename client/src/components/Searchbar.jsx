import { Button } from "./ui/button";
import { Input } from "./ui/input";


export function Searchbar({ search, setSearch, setSearchQuery }) {
    
  function handleSearch() {
    setSearchQuery(search);
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        className="border-2 shadow-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button className="shadow-md" onClick={() => handleSearch()}>
        Search
      </Button>
    </div>
  );
}
