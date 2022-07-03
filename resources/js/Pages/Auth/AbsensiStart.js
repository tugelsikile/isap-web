import React from 'react';
import ReactDOM from 'react-dom';
import Camera, {IMAGE_TYPES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { sendFoto } from '../../Services/authServices';
import { checkShift } from '../../Services/authServices';
import haversine from 'haversine-distance';

export default class AbsensiStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            form: { foto: null },
            shift: null,
            locations: { current: { lat: 0, lng: 0 }, target: { lat: 0, lng: 0 } },
            button : { disabled : true }
        }
        this.handleTakePhoto = this.handleTakePhoto.bind(this);
        this.checkShiftUsers = this.checkShiftUsers.bind(this);
    }

    componentDidMount() {
        this.initService();
    }
    initService() {
        this.currentLocation();
    }
    async currentLocation(){
        let position = await navigator.geolocation.getCurrentPosition(position => {
            let locations = this.state.locations;
            locations.current.lat = position.coords.latitude,
                locations.current.lng = position.coords.longitude;
            this.setState({ locations });
            this.checkShiftUsers();
        });
    }
   async checkShiftUsers() {
        try {
            let response = await checkShift(this.state.token);
            if (response.data.status_data === null) {
                alert(response.data.status_message);
            } else {
                let locations = this.state.locations;
                this.state.locations.target.lat = response.data.status_data.lat;
                this.state.locations.target.lng = response.data.status_data.lng;
                this.setState({ shift: response.data.status_data, locations });
                this.checkHitungJarak();
            }
        } catch (e) {
            console.log(e);
        }
    }

    checkHitungJarak() {
        let jarak = 0;
        if (!this.state.shift.outside) {
            jarak = haversine(this.state.locations.current, this.state.locations.target);
        }
        if (jarak > this.state.shift.radius) {
            alert('gaboleh absen jaraknya kejauhan');
        } else {
            let button = this.state.button;
            button.disabled = false;
            this.setState({ button });
        }
    }

   async handleTakePhoto(dataUri) {
        var fd = new FormData();
        fd.append('data', dataURLtoFile(dataUri,'ghhhj.jpg'));
       let response = await sendFoto(null, fd);
    }

    getFile(string64, fileName) {
            const trimmedString = string64.replace('dataimage/jpegbase64', '');
            const imageContent = atob(trimmedString);
            const buffer = new ArrayBuffer(imageContent.length);
            const view = new Uint8Array(buffer);

            for (let n = 0; n < imageContent.length; n++) {
                view[n] = imageContent.charCodeAt(n);
            }
            const type = 'image/jpeg';
            const blob = new Blob([buffer], { type });
            return new File([blob], fileName, { lastModified: new Date().getTime(), type });
    }

    render() {
        return (
            <>
                <h1>AbsensiStart</h1>
                <Camera
                    imageType = {IMAGE_TYPES.JPG}
                    onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                />
                <button onClick={this.handleTakePhoto} disabled={this.state.button.disabled}>ABSEN MULAI</button>
            </>
        )
    }
}

if (document.getElementById('absensi-start')) {
    ReactDOM.render(<AbsensiStart />, document.getElementById('absensi-start'));
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}