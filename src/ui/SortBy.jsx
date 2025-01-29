import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams({});
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  const currentSort = searchParams.get("sortBy") || "";
  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentSort}
      type="white"
    ></Select>
  );
}

export default SortBy;
