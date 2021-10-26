import React, { Component } from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-order";
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
        console.log(`this is ${this.state.purchasable}`);
    }

    addIngredientHandler = (type) => {
        //prilog
        const oldCount = this.state.ingredients[type]; //0 npr, koliko je stavljeno sira npr 
        const updatedCounted = oldCount +1; 
        const updatedIngredients = {
            ...this.state.ingredients
        } 
        updatedIngredients[type] = updatedCounted;
        //cena
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
         //prilog
         const oldCount = this.state.ingredients[type]; //0 npr, koliko je stavljeno sira npr 
         if(oldCount <= 0) {
             return;
         }
         const updatedCounted = oldCount - 1; 
         const updatedIngredients = {
             ...this.state.ingredients
         } 
         updatedIngredients[type] = updatedCounted;
         //cena
         const priceDeduction = INGREDIENTS_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice - priceDeduction;
 
         this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
         this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Uros Dimitrijevic',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '4512',
                    country: 'Serbia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/post', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false} );
                console.log(res);
            })        
            .catch(err => {
                this.setState({ loading: false, purchasing: false} );
                console.log(err);
            })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0;
        }
        let orderSummary =  <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        if(this.state.loading) {
            orderSummary = <Spinner /> 
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemove={this.removeIngredientHandler}
                    disabled={disableInfo} 
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/> 
            </Aux>
        );
    }
}

export default BurgerBuilder;   