import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { BASE_URL } from "../utils";
import { Link } from "react-router-dom";

const columns = [
    { id: 'image', label: 'Image', minWidth: 150 },
    { id: 'name', label: 'Name', minWidth: 150 },
    {
        id: 'symbol',
        label: 'Symbol',
        minWidth: 150,
    },
    {
        id: 'currentPrice',
        label: 'Current Price',
        minWidth: 150,
    },
    {
        id: 'high24hourPrice',
        label: 'High 24 hour Price',
        minWidth: 150,
    },
    {
        id: 'low24hourPrice',
        label: 'Low 24 hour Price',
        minWidth: 150,
    },
    {
        id: 'view',
        label: 'View',
        minWidth: 150,
    },
];

const Coins = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(BASE_URL + "/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false").then((result) => {
            if (result?.data?.length) {
                setData(result.data)
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }, [])

    const returnedList = () => {
        if (data.length > 0) {
            return data.map((row, index) => (
                <TableRow
                    key={index}
                >
                    <TableCell align="center">
                        <img src={row.image} width={30} />
                    </TableCell>
                    <TableCell align="center">{row?.name}</TableCell>
                    <TableCell align="center">{row?.symbol}</TableCell>
                    <TableCell align="center">{row?.current_price}</TableCell>
                    <TableCell align="center">{row?.high_24h}</TableCell>
                    <TableCell align="center">{row?.low_24h}</TableCell>
                    <TableCell align="center">
                        <Link to={"/" + row?.id} className="link">View</Link>
                    </TableCell>
                </TableRow>
            ))
        }
    }

    return (<div className="mainContainer">
        <TableContainer component={Paper} className="tableBlock">
            <Table size="medium" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={"center"}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? <TableRow
                    ><TableCell align="center"><Box style={{ display: 'flex', alignContent: "center", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box></TableCell></TableRow> : returnedList()}
                </TableBody>
            </Table>
        </TableContainer>
    </div>);
}

export default Coins;