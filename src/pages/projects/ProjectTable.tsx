import {useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";

const RequestTableComponent = () => {

    const columns = [
        { id: 'fullName', label: 'Full Name', minWidth: 170 },
        { id: 'seniority', label: 'Seniority', minWidth: 100 },
        { id: 'position', label: 'Position', minWidth: 100 },
        { id: 'value', label: 'Value', minWidth: 100 },
    ];

    const createData = (fullName, seniority, position, value) => {
        return { fullName, seniority, position, value };
    }

    const rows = [
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),
        createData('Kis Károly', 'junior', 'Software Developer', 1500 ),

    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={'center'}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.fullName}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={'center'}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default RequestTableComponent;