import React from "react";
import Image from 'next/image'
import Logo from "../assets/images/hrlogo.png";
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from "@material-ui/core";
import { RiMenu3Fill } from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Base: React.FC = ({children}) => {
  const classes = useStyles()

  return(
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <RiMenu3Fill color="#fff"/>
          </IconButton>
          <Typography variant="h6" className={`${classes.title} text-white`}>
            News
          </Typography>
          <Button color="secondary" variant="text">
            <Typography variant="button" className={`${classes.title}  text-white`}>
              Login
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}