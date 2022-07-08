import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import PaymentIcon from '@mui/icons-material/Payment';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavbarPages  from '../../Components/Dashboard/NavbarPages';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: null,
      token : localStorage.getItem('token'),
    }
    this.loadMe = this.loadMe.bind(this);
  }
  
  componentDidMount() {
    this.loadMe();
    let bootom_height = document.getElementById('navigationBottom').clientHeight;
    let upper_height = document.getElementById('navigationUpper').clientHeight;

    document.getElementById('content').style.marginTop = upper_height + 'px';
    document.getElementById('content').style.marginBottom = bootom_height + 'px';
    }

    async loadMe() {
        if (localStorage.getItem('user') === null) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = window.origin + '/login';
        } else {
            this.setState({current_user:JSON.parse(localStorage.getItem('user'))});
        }
    }



    render() {

    const pages = [];
    const settings = [ 'Logout'];
        
    const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            <img src={window.origin + '/images/rstnet.png'} style={{ height: "40px" }}></img>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* LOGO */}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={() => { handleCloseNavMenu; window.location.href = window.origin + '/'}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
              <img src={window.origin + '/images/rstnet.png'} style={{ height: "40px" }}></img>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={this.state.current_user === null ? '' : this.state.current_user.meta.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                                        handleCloseUserMenu;
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('user');
                                        window.location.href = window.origin + '/login';}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


        function SimpleBottomNavigation() {
            const [value, setValue] = React.useState(0);

            return (
                <Box sx={{ width: 500 }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                >
                        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => {
                        }} />
                        <BottomNavigationAction label="Absen" icon={<FingerprintIcon />} onClick={() => {
                            window.location.href = window.origin + '/absensi';
                        }} />
                    <BottomNavigationAction label="Payroll" icon={<PaymentIcon />} />
                    <BottomNavigationAction label="Notifikasi" icon={<CircleNotificationsIcon />} />
                    <BottomNavigationAction label="Profill" icon={<PersonIcon />} />
                </BottomNavigation>
                </Box>
            );
        }

        return (
          <>
                <div className='fixed-top' id='navigationUpper'>
                    <NavbarPages/>
                </div>

                <div style={{position:"relative"}} id='content'>
                {
                    this.state.current_user === null ? null :
                        this.state.current_user.meta.level.meta.menus.map((item, index) =>
                            <p key={index}>{item.label}</p>
                        )
                }
                </div>
              
                <div className="d-flex justify-content-around fixed-bottom" id='navigationBottom'>            
                    <SimpleBottomNavigation/>
                </div>
            </>
        )
      }
    }
    
    
    if (document.getElementById('dashboard')) {
      ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
    }