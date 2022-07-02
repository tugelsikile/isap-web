import React from 'react';
import ReactDOM from 'react-dom';
import { authServices } from "../../Services/authServices";
import moment from 'moment';
import { me } from "../../Services/authServices";
import { absensiThisDay } from '../../Services/authServices';

export default class Absensi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            form: { periode: null },
            current_user: null,
            absensi_sekarang:null,
        }

        this.loadMe = this.loadMe.bind(this);
        this.getAllAbsensi = this.getAllAbsensi.bind(this);
    }
    

    componentDidMount() {
        this.loadMe();
    }

    async loadMe() {
        try {
            let response = await me(this.state.token);
            if (response.data.params == null) {
                alert('error');
            } else {
                this.setState({ current_user: response.data.params })
            }
        } catch (e) {
            if (e.response.status === 401) {
                window.location.href = window.origin + '/';
            }
        }
        this.getAllAbsensi();
    }

    async getAllAbsensi() {
        try {
            let periode = "2022-04-01";
            let formData = new FormData();
            formData.append('periode', periode);
            let response = await absensiThisDay(this.state.token, formData);
            this.setState({ absensi_sekarang: response.data.params });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <>
                <div>Selamat Data di Menu Absensi</div>
                <div style={{ width: "1200px" }}>
                    {this.state.absensi_sekarang == null ? <h5>Belum Ada Absensi</h5> : this.state.absensi_sekarang.map((item, index) => {
                        let src = item.meta.file;
                        return (
                            <div key={index} style={{display:'inline-block', padding: "20px", maxHeight: "100px" }}>
                                {item.meta.file == "" ? <img style={{ width: "50px" }} src={window.origin + "/public/images/default.png"}></img> : <img style={{ width: "50px" }} src={src}></img>}
                                <p>{item.label}</p>
                            </div>
                        )
                        
                    })
                    
                    }
                </div>

                {this.state.current_user === null ? null : this.state.current_user.meta.group.value === "" ? null : 
                
                    <button onClick={() => {
                        window.location.href = window.origin + '/absensi/start';
                    }}>Absen Dong
                    </button>
                }

                <button type='button' onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = window.origin + '/';
                }}>Log Out</button>
            </>
        )
    }
}

if (document.getElementById('absensi')) {
    ReactDOM.render(<Absensi />, document.getElementById('absensi'));
}