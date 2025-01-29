import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "price-asc", label: "Price (low first)" },
          { value: "price-desc", label: "Price (high first)" },
          { value: "discount-asc", label: "Discount (low first)" },
          { value: "discount-desc", label: "Discount (high first)" },
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "maxCapacity-asc", label: "maxCapacity (low first)" },
          { value: "maxCapacity-desc", label: "maxCapacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
