import React from 'react'

const Tile = ({name , views , cover}) => {
    return (
        <div className="tileart">
            <div className="imgcon">
                <img src={cover}></img>
            </div>
            <div className="info">
                <div className="name">{name}</div>
                <div className="views"></div>
            </div>
        </div>
    )
}

export default Tile
