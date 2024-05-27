/* eslint-disable react/prop-types */
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationButtons({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (event, value) => {
    paginate(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        color="primary"
        page={currentPage}
      />
    </Stack>
  );
}
