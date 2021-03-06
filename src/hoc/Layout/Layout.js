import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }
    
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    //clean way of setting the state when it depends on the old state
    drawerToggleClickedHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.drawerToggleClickedHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                {/* <div>Toolbar,SideDrawer,Backdrop</div> */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
}

export default Layout;  