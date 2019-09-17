import React from "react";
import CanvasLayer from "./canvaslayer";

const borderStyle = {
    border: "1px solid black"
}

const smallCanvas = {
    width: 128,
    height: 128
}

const copyCanvas = (destCtx, data) => {
    const img = new Image;
    img.src = data;
    img.onload = () => {
        destCtx.drawImage(img, 0, 0);
    }
}


class Layers extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="layers">
                <p>LAYERS</p>
                <button onClick={this.props.addCanvasLayer} >ADD LAYER</button>
                <div style={{ display: "flex" }}>
                    {
                        this.props.layers.map((layer, i) => (
                            <div key={i} className="layer-box">
                                <CanvasLayer size={this.props.size} data={layer} />
                                <button onClick={() => this.props.removeCanvasLayer(i)}>remove layer</button>
                            </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Layers;