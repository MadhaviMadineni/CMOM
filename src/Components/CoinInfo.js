import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from "../utils";

function HTMLParse(content) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

const CoinInfo = () => {
    let { id } = useParams();
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (id) {
            setLoading(true)
            axios.get(BASE_URL + "/" + id).then((result) => {
                if (result?.data) {
                    setInfo(result.data)
                }
                setLoading(false)
            }).catch((e) => {
                setLoading(false)
            })
        }
    }, [])
    return (<div>
        {loading ? <Box
            style={{ display: 'flex', alignContent: "center", justifyContent: "center" }}>
            <CircularProgress />
        </Box> : <div className="gridBlock">
            <div className="singleRow">
                <div className="coloumn keyBlock">
                    Name
                </div>
                <div className="coloumn">
                    {info?.name}
                </div>
            </div>
            <div className="singleRow">
                <div className="coloumn keyBlock">
                    Symbol
                </div>
                <div className="coloumn">
                    {info?.symbol || "-"}
                </div>
            </div>
            <div className="singleRow">
                <div className="coloumn keyBlock">
                    Hashing algorithm
                </div>
                <div className="coloumn">
                    {info?.hashing_algorithm || "-"}
                </div>
            </div>
            <div className="singleRow">
                <div className="coloumn keyBlock">
                    Description
                </div>
                <div className="coloumn">
                    {HTMLParse(info?.description['en']) || "-"}
                </div>
            </div>
            <div className="singleRow">
                <div className="coloumn keyBlock">
                    Market cap in Euro
                </div>
                <div className="coloumn">
                    {info?.market_data?.market_cap?.eur || "-"}
                </div>
            </div>
            <div className="singleRow">
                <div className="coloumn keyBlock">
                    Homepage
                </div>
                <div className="coloumn">
                    -
                </div>
            </div>
            <div className="singleRow">
                <div className="coloumn keyBlock">
                    Genesis Date
                </div>
                <div className="coloumn">
                    {info?.genesis_date || "-"}
                </div>
            </div>
        </div>}
    </div>);
}

export default CoinInfo;