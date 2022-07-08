import React from 'react';
import ReactDOM from 'react-dom';

import GoogleIcon from '@mui/icons-material/Google';
import {login,loginGoogle,me} from "../../Services/authServices";
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paper from '@mui/material/Paper';

import {auth,provider} from "../../Components/FirebaseConfig";

export default class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '', password: '', visibility : false
            }, loading : false,
        };
        this.submitAuth = this.submitAuth.bind(this);
        this.formGoogle = this.formGoogle.bind(this);
    }
    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
             window.location.href = window.origin + '/absensi';
        }
    }
    async submitGoogleLogin(formData, nama, picture){;
        try {
            let response = await loginGoogle(formData);
            if (response.data.params === nama) {
                alert(response.data.message);
                this.setState({loading:false});
            } else {
                localStorage.setItem('token', response.data.params);
                this.loadMe();
            }
        } catch (e) {
            alert(e);
            this.setState({loading:false});
        }
    }
    async loadMe(){
        try {
            let response = await me(localStorage.getItem('token'));
            if (response.data.params === null) {
                alert(response.data.message);
                this.setState({loading:false});
            } else {
                localStorage.setItem('user', JSON.stringify(response.data.params));
                window.location.href = window.origin + '/';
            }
        } catch (e) {
            alert(e.response.data.message);
            this.setState({loading:false});
        }
    }
    async formGoogle(){
        this.setState({loading:true});
        auth.signInWithPopup(provider)
            .then((res) => {
                const formData = new FormData();
                formData.append('email', res.additionalUserInfo.profile.email);
                formData.append('picture', res.additionalUserInfo.profile.picture);
                this.submitGoogleLogin(formData, res.additionalUserInfo.profile.picture);
            }).catch((err)=>{
                alert(err);
                this.setState({loading:false});
            });
    }
    async submitAuth(e) {
        e.preventDefault();
        this.setState({loading:true});
        try {
            let formData = new FormData();
            formData.append('username', this.state.form.email);
            formData.append('password', this.state.form.password);
            let response = await login(this.state.token, formData);

            if (response.data.params === null) {
                alert(response.data.message);
            } else {
                window.localStorage.setItem('token', response.data.params);
                this.loadMe();
            }
        } catch (e) {
            alert(e.response.data.message);
        }
        this.setState({loading:false});
    }


    render() {
        return (
            <>
                <div style={{margin:'50px auto',textAlign:'center'}}>
                    <img src={window.origin + '/images/rstnet.png'} height="70px" alt="logo"/>
                </div>
                <div className="container">
                    <Paper elevation={1}>
                        <div style={{padding:'20px'}}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-email">Nama Pengguna / Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email" type={'text'}
                                    value={this.state.form.email}
                                    onChange={(e)=>{
                                        let form = this.state.form; form.email = e.target.value; this.setState({form});
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircleIcon/>
                                        </InputAdornment>
                                    }
                                    label="Nama Pengguna / Email"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Kata Sandi</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password" type={this.state.form.visibility ? 'text' : 'password'}
                                    value={this.state.form.password}
                                    onChange={(e)=>{
                                        let form = this.state.form; form.password = e.target.value; this.setState({form});
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LockIcon/>
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>{
                                                    let form = this.state.form; form.visibility = ! this.state.form.visibility; this.setState({form});
                                                }}
                                                onMouseDown={()=>{
                                                    let form = this.state.form; form.visibility = ! this.state.form.visibility; this.setState({form});
                                                }}
                                                edge="end"
                                            >
                                                {this.state.form.visibility ? <VisibilityIcon/> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Kata Sandi"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} >
                                <LoadingButton onClick={this.submitAuth}
                                               loading={this.state.loading} loadingPosition="start"
                                               startIcon={<LockIcon/>} variant="contained">
                                    LOGIN
                                </LoadingButton>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} >
                                <LoadingButton onClick={this.formGoogle}
                                               loading={this.state.loading} loadingPosition="start"
                                               startIcon={<GoogleIcon/>} variant="contained">
                                    LOGIN GOOGLE
                                </LoadingButton>
                            </FormControl>
                        </div>
                    </Paper>
                </div>
            </>
        )
    }
}


if (document.getElementById('auth')) {
    ReactDOM.render(<Auth />, document.getElementById('auth'));
}
