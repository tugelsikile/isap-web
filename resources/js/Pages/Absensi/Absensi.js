import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
moment.locale('id');
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import Fab from '@mui/material/Fab';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { me } from "../../Services/authServices";
import { absensiThisDay } from '../../Services/authServices';

export default class Absensi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            form: { periode: null },
            current_user: null,
            absensi_sekarang: [],
            popup : {anchor:null,open:false}
        };

        this.loadMe = this.loadMe.bind(this);
        this.getAllAbsensi = this.getAllAbsensi.bind(this);
    }


    componentDidMount() {
        this.loadMe();
    }

    async loadMe() {
        if (localStorage.getItem('user') === null) {
            window.location.href = window.origin;
        } else {
            this.setState({current_user:JSON.parse(localStorage.getItem('user'))});
            this.getAllAbsensi();
        }
    }

    async getAllAbsensi() {
        try {
            let periode = moment().format('yyyy-MM-DD');
            //periode = '2022-04-04';
            let formData = new FormData();
            formData.append('periode', periode);
            let response = await absensiThisDay(this.state.token, formData);
            if (response.data.params === null) {
                alert(response.data.message);
            } else {
                this.setState({ absensi_sekarang: response.data.params });
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    }
    render() {
        return (
            <>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography variant="h6" noWrap component="a" href="/"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
                                ABSENSI
                            </Typography>
                            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography variant="h5" noWrap component="a"
                                href=""
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

                <ImageList>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">{moment().format('DD MMMM yyyy')}</ListSubheader>
                    </ImageListItem>
                    {this.state.absensi_sekarang.map((item,index) => (
                        <ImageListItem key={index}>
                            <img
                                src={`${item.meta.file.length === 0 ? window.origin + '/images/default.png' : item.meta.file }?w=248&fit=crop&auto=format`}
                                srcSet={`${item.meta.file.length === 0 ? window.origin + '/images/default.png' : item.meta.file}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.label}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.label}
                                subtitle={moment(item.meta.at).format('HH:mm')}/>
                        </ImageListItem>
                    ))}
                </ImageList>

                {this.state.current_user === null ? null : this.state.current_user.meta.group.value === "" ? null :
                    <Fab onClick={()=>window.location.href=window.origin + '/absensi/start'} style={{position:'fixed',bottom:'10px',left:'10px',right:'auto',margin:'auto'}} color="primary" aria-label="add">
                        <FingerprintIcon />
                    </Fab>
                }
            </>
        )
    }
}

if (document.getElementById('absensi')) {
    ReactDOM.render(<Absensi />, document.getElementById('absensi'));
}
