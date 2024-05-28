import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';


import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Authentication/UseAuthContext';

const drawerWidth = 240;




function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}





// --------------------search-----------------
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));



function DrawerAppBar(props) {


  const { user, logout } = useUserAuth();

  const navItems = [
    {
        id:1,
        to: '/',
        name: 'Home',
    },
    {
        id:2,
        to: '/contact',
        name: 'Contact',
    },
    {
        id:3,
        to: '/about',
        name: 'About',
    },
    {
        id:4,
        to: '/certificate',
        name:'Certificate',
    }
  ];
  
  
  const settings = [
    {
      id:1,
      name:'Profile',
      link: `/dashboard/profile`
    },
    {
      id:2,
      name:'Exam',
      link: `/dashboard/exam`
    },
    {
      id:3,
      name:'Dashboard',
      link: `/dashboard`
    },
    {
      id:4,
      name:'Logout',
      link: 'signout'
    }
  ];

  const navi = useNavigate();





  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [error, setError] = useState("");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SkillSphere
      </Typography>
      <Divider />
      <List>
        {navItems.map((items) => (
          <ListItem key={items.id} disablePadding>
            <ListItemButton >
              <NavLink className="linkClasses active" to={items.to} sx={{ textAlign: 'center' }}>{items.name}</NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <ElevationScroll {...props}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            SkillSphere
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((items)=>(
              <NavLink key={items.id} className='lnk active' to={items.to}>{items.name}</NavLink>
            ))}
          </Box>

          {/* -------------------search-------------- */}
          <Search sx={{ margin: 2 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for Courses"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          

          {!user?
          <Box sx={{ display: 'grid', gap:1 , gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Box>
              <Link className='gr' to='/login'>Login</Link>
            </Box>
            <Box>
              <Link className='gr' to='/register'>Register</Link>
            </Box>
          </Box>
          :
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="profileImg" src={user.photoURL}/>
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
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>                  
                  <List onClick={()=>{
                    if(setting.link === 'signout'){
                      logout();
                    }else{
                      navi(setting.link);
                    }
                  }}>
                    {setting.name}
                  </List>
                </MenuItem>
              ))}
            </Menu>
          </Box>}

        </Toolbar>
      </AppBar>
      </ElevationScroll>





      <Box component="nav">
        <Drawer
          container={container}
          // variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>      
    </Box>
  );
}

export default DrawerAppBar;