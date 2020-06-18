import React , {useContext} from 'react'
import "./DashBoard.css"
import {artist} from "../data"
import Tile from "../components/Tile"
import {AppContext} from "../Pages/AppContext"
const DashBoard = () => {

    const { drizzleState } = React.useContext(AppContext);

    return (
        <div className="dash">
            <div className="top">
                <div className="logo">BITIFY</div>
                <div></div>
            </div>
            <div className="artists">
                {artist.map((artist, index) => (
                    <Tile
                    key={index}
                    name={artist.name}
                    cover={artist.cover}
                    views={artist.views}
                    />
                ))}
            </div>
                <div className="transactionList">{console.log(drizzleState)}</div>
        </div>
    )
}

export default DashBoard
