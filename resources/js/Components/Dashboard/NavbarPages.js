import React from 'react';
import ReacDOM from 'react-dom';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default class NavbarPages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_user: JSON.parse(localStorage.getItem('user')),
            popup : {anchor:null,open:false}
        }
    }

    componentDidMount() {
        console.log(this.state.current_user);
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
                            <ArrowBackIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} onClick={()=>{window.location.href=window.origin + '/'}} />
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
                
            </>
        )
    }
}