import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    //improve performances
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }
    
    render() {
        return (
            <Aux>
        {/* backdrop - to nam je da pozadina bude zatamljena i da kliknemo na nju da nestane modal */}
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
        </div>
    </Aux>
        )
    }
}

export default Modal;