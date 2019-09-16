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
                    {this.props.layers.map((layer, i) => <CanvasLayer key={i} size={this.props.size} data={layer} />)}
                </div>
            </div>
        )
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


class Piskel extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            layers: [],
            canvasSize: 512
        }
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        canvas.getContext("2d").fillRect(0, 0, 10, 10);
        const layers = [];
        layers.push(canvas.toDataURL());
        this.setState({
            layers: layers,
            blankCanvasURL: canvas.toDataURL()
        });
    }

    addCanvasLayer = () => {
        const x = Math.floor(Math.random() * this.state.canvasSize);
        const y = Math.floor(Math.random() * this.state.canvasSize);
        this.canvasRef.current.getContext("2d").fillRect(x, y, 150, 150);
        let layers = this.state.layers;
        layers.push(this.canvasRef.current.toDataURL());
        this.setState({
            layers: layers
        })
    }

    render() {
        return (
            <div className="piskel">
                <div style={borderStyle} className="main-body">
                    <p>MAIN</p>
                    <canvas ref={this.canvasRef} width={this.state.canvasSize} style={{ ...borderStyle, display: "" }} height={this.state.canvasSize} />
                </div>
                <Layers addCanvasLayer={this.addCanvasLayer} size={this.state.canvasSize} layers={this.state.layers} />
            </div>
        )
    }
}

export default Piskel;