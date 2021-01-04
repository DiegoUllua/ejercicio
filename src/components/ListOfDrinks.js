import React from 'react';
import Drink from './Drink'
import '../App.css';

const ListOfDrinks = ({drinks}) => {
    return ( 
    <>
    <div className="results ">
        {drinks ? drinks.map(drink => <Drink key={drink.idDrink} drink={drink}></Drink>) : null}
    </div> 
    </>
    );
}
 
export default ListOfDrinks;