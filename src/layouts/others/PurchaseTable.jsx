/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CustomTableCell = ({ align = "center", children }) => (
  <TableCell
    align={align}
    sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
  >
    {children}
  </TableCell>
);

// function createData(details, quantity, unitPrice, totalPrice) {
//   return { details, quantity, unitPrice, totalPrice };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function PurchaseTable() {
  return (
    <TableContainer component={Paper}>
      <Table className="purchase-table" aria-label="purchase table">
        <TableHead>
          <TableRow>
            <CustomTableCell>Детайли</CustomTableCell>
            <CustomTableCell>Количество</CustomTableCell>
            <CustomTableCell>Единична цена</CustomTableCell>
            <CustomTableCell>Крайна цена</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row.calories}</CustomTableCell>
              <CustomTableCell align="right">{row.fat}</CustomTableCell>
              <CustomTableCell align="right">{row.carbs}</CustomTableCell>
              <CustomTableCell align="right">{row.protein}</CustomTableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
