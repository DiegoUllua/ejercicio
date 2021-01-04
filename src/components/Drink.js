import React from 'react';
import '../App.css';

const Drink = ({drink}) => {
    return (  
        <div className="card drink mb-3">
            <img src={drink.strDrinkThumb} className="card-img" alt={drink.strDrink}/>
            <div className="card-body">
                <p className="card-text">{drink.strDrink}</p>
            </div>
        </div>

     );
}
 
export default Drink;