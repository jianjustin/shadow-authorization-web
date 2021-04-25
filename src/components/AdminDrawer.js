import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function AdminDrawer(){
    const classes = useStyles();

    return (
    <Drawer variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbarIcon}>
          <IconButton >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListSubheader>用户管理</ListSubheader>
          <Divider />
          <ListItemLink to="/admin/user" primary="账户管理" icon={<InboxIcon />} />
          <ListItemLink to="/admin/role" primary="角色管理" icon={<DraftsIcon />} />
          <ListItemLink to="/admin/resource" primary="资源管理" icon={<InboxIcon />} />
          <ListItemLink to="/admin/authority" primary="授权管理" icon={<DraftsIcon />} />
        </List>
        <List>
          <ListSubheader>系统管理</ListSubheader>
          <Divider />
          <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} />
          <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
        </List>
    </Drawer>
    );
}

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default AdminDrawer;