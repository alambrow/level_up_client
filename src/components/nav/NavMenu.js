import React from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DehazeIcon from '@material-ui/icons/Dehaze';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const history = useHistory()

  const renderLoginLogout = () => {
      if (localStorage.getItem("lu_token") !== null) {
          return (
            <MenuItem onClick={event => {
                event.preventDefault()
                localStorage.removeItem("lu_token")
                history.push("/")}}>
            Logout
            </MenuItem>
          )
      } else {
          return (
            <MenuItem onClick={event => {
                event.preventDefault()
                history.push("/login")}}>
            Login 
            </MenuItem>
          )
      }
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <DehazeIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={event => {
            event.preventDefault()
            history.push("/games")}}>Games</MenuItem>
        <MenuItem onClick={event => {
            event.preventDefault()
            history.push("/events")}}>Events</MenuItem>
        {
            renderLoginLogout()
        }
      </Menu>
    </div>
  );
}