import React from "react";

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

class CanvasLayer extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();

    }

    componentDidMount() {
        copyCanvas(this.canvasRef.current.getContext("2d"), this.props.data);

    }

    componentDidUpdate() {
        this.canvasRef.current.getContext("2d").clearRect(0, 0, this.props.size, this.props.size);
        copyCanvas(this.canvasRef.current.getContext("2d"), this.props.data);
    }

    render() {
        return (
            <div className="canvas-layer">
                <p>Canvas Layer</p>
                <p>{this.props.height}</p>
                <canvas width={this.props.size} height={this.props.size} ref={this.canvasRef} style={{ ...borderStyle, ...smallCanvas }}></canvas>
            </div>
        )
    }
}

export default CanvasLayer;