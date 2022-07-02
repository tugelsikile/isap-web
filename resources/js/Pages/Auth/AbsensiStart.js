import React from 'react';
import ReactDOM from 'react-dom';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default class AbsensiStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video : null, canvas : null, context : null, navigator : null
        }

    }

    componentDidMount() {
    }
    handleTakePhoto(dataUri) {
        console.log('pasd');
    }

    render() {
        return (
            <>
                <h1>AbsensiStart</h1>
                <Camera
                    onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri).bind(this); } }
                />
            </>
        )
    }
}

if (document.getElementById('absensi-start')) {
    ReactDOM.render(<AbsensiStart />, document.getElementById('absensi-start'));
}
