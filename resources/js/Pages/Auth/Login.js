import React from 'react';
import ReactDOM from 'react-dom';
import {authServices} from "../../Services/authServices";


export default class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: null, password: null
            }
        };
        this.submitAuth = this.submitAuth.bind(this);
    }
    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
             window.location.href = window.origin + '/absensi';
        }
    }

async submitAuth(e) {
    e.preventDefault();
    try {
        let formData = new FormData();
        formData.append('username', this.state.form.email);
        formData.append('password', this.state.form.password);
        let response = await authServices(this.state.token, formData);
        
        if (response.data.params === null) {
            alert('error');
        } else {
            window.localStorage.setItem('token', response.data.params);
            window.location.href = window.origin + "/absensi";
        }
        console.log(response);
    } catch (e) {
        console.log(e);
    }

}


    render() {
        return (
            <>
                <form onSubmit={this.submitAuth}>
                    <div style={{margin:'20px'}}>
                        <label>Email</label>
                        <input type={'text'} onChange={(e) => {
                            let form = this.state.form;
                            form.email = e.target.value;
                            this.setState({ form });
                        }} />
                    </div>

                    <div style={{margin:'20px'}}>
                        <label>Password</label>
                        <input type={'password'} onChange={(e) => {
                            let form = this.state.form;
                            form.password = e.target.value;
                            this.setState({ form });
                        }} />
                    </div>

                    <div>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </>
        )
    }
}


if (document.getElementById('auth')) {
    ReactDOM.render(<Auth />, document.getElementById('auth'));
}
