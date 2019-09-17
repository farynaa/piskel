import React from "react";
import Layers from "./components/layers";
import CanvasLayer from "./components/canvaslayer";

const borderStyle = {
    border: "1px solid black"
}

const smallCanvas = {
    width: 128,
    height: 128
}

const copyCanvas = (destCtx, data) => {
    const img = new Image();
    img.src = data;
    img.onload = () => {
        destCtx.drawImage(img, 0, 0);
    }
}


class Animation extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            counter: 0,
            animated: false,
            intervalId: -1,
            interval: 100,
        }
    }

    componentDidMount() {
        if (this.state.animated) {
            this.startInterval();
        }
        console.log("animation mounted");

    }

    componentDidUpdate() {
        console.log("animation updated");
    }

    startInterval = () => {
        clearInterval(this.state.intervalId);
        const intervalId = setInterval( () => {
            let counter = this.state.counter;
            if (counter + 1 >= this.props.layers.length) {
                counter = 0;
            }
            else {
                counter += 1;
            }
            this.setState({
                counter: counter
            })
        }, this.state.interval)
        this.setState({
            intervalId: intervalId
        })
    }

    stopInterval = () => {
        clearInterval(this.state.intervalId);
    }

    toogleAnimation = () => {
        if (this.state.animated) {
            this.stopInterval();
        }
        else {
            this.startInterval();
        }
        this.setState({
            animated: !this.state.animated
        })
    }

    render() {
        console.log('animation render');
        //const backgroundImage = {this.}
        return (
            <div className="animation">
                <div>
                    <p onClick={this.stopInterval}>ANIMATON</p>
                    {this.state.counter} + {this.state.animated.toString()} + {this.state.intervalId} + {this.props.layers.length}
                    <p><button onClick={this.toogleAnimation}>toggle animation</button></p>
                </div>
                <div>
                    <div style={{border: "1px solid black", backgroundSize: "contain", width: 128, height: 128, backgroundImage: `url(${this.props.layers[this.state.counter]})`}}></div>
                </div>
            </div>
        )
    }
}
//<CanvasLayer size={this.props.size} data={this.props.layers[this.state.counter]}/>

//<canvas width={this.props.size} height={this.props.size} ref={this.canvasRef} style={{ ...borderStyle, ...smallCanvas }}></canvas>



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

    componentDidUpdate() {
        this.canvasRef.current.getContext("2d").clearRect(0, 0, this.state.canvasSize, this.state.canvasSize);
        copyCanvas(this.canvasRef.current.getContext("2d"), this.state.layers.slice(-1)[0]);
        //copyCanvas(canvas.getContext("2d"), this.state.layers.slice(-1)[0]);
    }

    addCanvasLayer = () => {
        const x = Math.floor(Math.random() * this.state.canvasSize);
        const y = Math.floor(Math.random() * this.state.canvasSize);
        this.canvasRef.current.getContext("2d").fillRect(x, y, 50, 50);
        let layers = this.state.layers;
        layers.push(this.canvasRef.current.toDataURL());
        this.setState({
            layers: layers
        })
    }

    removeCanvasLayer = (i) => {
        console.log(i, this.state.layers.length)
        if (i < this.state.layers.length && this.state.layers.length > 1) {
            console.log("true")
            console.log(this.state.layers.length)
            let layers = this.state.layers;
            layers.splice(i, 1);
            this.setState({
                layers: layers
            })
        }
    }

    render() {
        return (
            <div className="piskel">
                <div style={borderStyle} className="main-body">
                    <p>MAIN</p>
                    <canvas ref={this.canvasRef} width={this.state.canvasSize} style={{ ...borderStyle, display: "" }} height={this.state.canvasSize} />
                </div>
                <div className="layers">
                    <Layers removeCanvasLayer={this.removeCanvasLayer} addCanvasLayer={this.addCanvasLayer} size={this.state.canvasSize} layers={this.state.layers} />
                </div>
                <Animation size={this.state.canvasSize} layers={this.state.layers} width={this.state.canvasSize} height={this.state.canvasSize}/>
            </div>
        )
    }
}

export default Piskel;