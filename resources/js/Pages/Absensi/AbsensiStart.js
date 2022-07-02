import React from 'react';
import ReactDOM from 'react-dom';
import Camera, {FACING_MODES,IMAGE_TYPES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { checkShift,startAbsen } from '../../Services/authServices';
import haversine from 'haversine-distance';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SendIcon from '@mui/icons-material/Send';

export default class AbsensiStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'), current_user : null,
            form: { foto: null },
            formData : new FormData(),
            shift: null,
            locations: { current: { lat: 0, lng: 0 }, target: { lat: 0, lng: 0 } },
            button : { disabled : true }, loading : false,
            popup : {anchor:null,open:false},
            capturing : false,
        };
        this.handleTakePhoto = this.handleTakePhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkShiftUsers = this.checkShiftUsers.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('user') === null) {
            window.location.href = window.origin;
        } else {

            this.setState({current_user:JSON.parse(localStorage.getItem('user'))});
            this.initService();
        }
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
            alert(e.response.data.status_message);
        }
    }

    checkHitungJarak() {
        let jarak = 0;
        let button = this.state.button;
        if (!this.state.shift.outside) {
            jarak = haversine(this.state.locations.current, this.state.locations.target);
        }
        if (jarak > this.state.shift.radius) {
            alert('gaboleh absen jaraknya kejauhan');
        } else {
            button.disabled = false;
            this.setState({ button ,capturing:true});
        }
    }

   async handleTakePhoto(dataUri) {
        let form = this.state.form;
        let formData = this.state.formData;
        formData.append('_method', 'put');
        form.foto = dataUri;
        formData.append('gambar_absen', dataURLtoFile(dataUri,'ghhhj.jpg'));
        this.setState({formData,form,capturing:false});
        this.handleSubmit();
        /*var fd = new FormData();
        fd.append('data', dataURLtoFile(dataUri,'ghhhj.jpg'));
       let response = await sendFoto(null, fd);*/
    }
    async handleSubmit(){
        this.setState({loading:true});
        try {
            let formData = this.state.formData;
            formData.append('lokasi_latitude', this.state.locations.current.lat);
            formData.append('lokasi_longitude', this.state.locations.current.lng);
            formData.append('versi_aplikasi','20220703');
            formData.append('alamat_ip','0.0.0.0');
            formData.append('is_maintenance', 0);
            let response = await startAbsen(localStorage.getItem('token'), formData);
            if (response.data.params === null) {
                alert(response.data.message);
            } else {
                window.location.href = window.origin + '/absensi';
            }
        } catch (e) {
            console.log(e);
            alert(e.response.data.message);
        }
        this.setState({loading:true});
    }
    render() {
        return (
            <>
                <AppBar position="fixed">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography variant="h6" noWrap component="a" href="/"
                                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
                                ABSENSI
                            </Typography>
                            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography variant="h5" noWrap component="a"
                                        href={window.origin}
                                        sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
                                ABSENSI
                            </Typography>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={(e)=>{
                                        let popup = this.state.popup; popup.anchor = e.currentTarget; this.setState({popup});
                                    }} sx={{ p: 0 }}>
                                        <Avatar alt={this.state.current_user === null ? '' : this.state.current_user.label} src={this.state.current_user === null ? '' : this.state.current_user.meta.avatar} />
                                    </IconButton>
                                </Tooltip>
                                <Menu sx={{ mt: '45px' }} id="menu-appbar"
                                      anchorEl={this.state.popup.anchor}
                                      anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                      keepMounted
                                      transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                                      open={Boolean(this.state.popup.anchor)}
                                      onClose={()=>{
                                          let popup = this.state.popup; popup.anchor = null; this.setState({popup});
                                      }}>
                                    <MenuItem onClick={()=>{
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('user');
                                        window.location.href = window.origin;
                                    }}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                {this.state.capturing ?
                    <Camera
                        imageType = {IMAGE_TYPES.JPG} isFullscreen={true}
                        idealFacingMode={FACING_MODES.USER}
                        onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                    />
                    :
                    <img alt="poto" style={{width:'100%'}} src={this.state.form.foto}/>
                }
                {this.state.form.foto !== null &&
                    <Fab disabled={this.state.loading} onClick={this.handleSubmit} style={{position:'fixed',bottom:'10px',left:'10px',right:'auto',margin:'auto'}} color="primary" aria-label="add">
                        <SendIcon />
                    </Fab>
                }
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
