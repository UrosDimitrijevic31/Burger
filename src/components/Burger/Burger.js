import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    //Object.keys -> rpavi niz od kljuceva objekta
    const transformIngredients = Object.keys(props.ingredients)
        .map(igKey => { 
            return [...Array(props.ingredients[igKey])].map( (_, i) => {
                 return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        }); 
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />            
        </div>
    );
}

export default burger;