import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
    <Aux>
        {/* backdrop - to nam je da pozadina bude zatamljena i da kliknemo na nju da nestane modal */}
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
)

export default modal;