import React from 'react';
import ReactDOM from 'react-dom';

export default class AbsensiStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video : null, canvas : null, context : null, navigator : null
        }

    }

    componentDidMount() {
        this.init();
    }
    init() {
        let canvas = document.getElementById('canvas');
        this.setState({
            canvas: canvas,
            video: document.getElementById('video'),
            context: canvas.getContext('2d'),
            navigator : navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                          navigator.oGetUserMedia || navigator.msGetUserMedia
        });
        this.getStream();
    }
    getStream() {
        if (this.state.navigator.getUserMedia({ video: true }, this.streamWebCam.bind(this), this.throwError.bind(this)));
    }
    streamWebCam(stream) {
        let video = this.state.video;
        video.src = window.URL.createObjectURL(stream);
        video.play();
        this.setState({ video });
    }
    throwError(e) {
        console.log(e);
    }
    snap() {
        this.state.canvas
    }

    render() {
        return (
            <>
                <h1>AbsensiStart</h1>
                <video id='video'></video>
                <canvas id='canvas'></canvas>
                <button type='button'></button>
            </>
        )
    }
}

if (document.getElementById('absensi-start')) {
    ReactDOM.render(<AbsensiStart />, document.getElementById('absensi-start'));
}