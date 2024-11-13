import emptyBasketIcon from '../assets/img/basket_empty.png'
import ImageButton from "./ImageButton";
import React from "react";
import { basketStyle } from "../styles/Basket.style";
import { deleteAllProductsDB } from '../services/db';

const EmptyBasket = () => {
    const deleteProductsFromBasket = async () => {
        await deleteAllProductsDB()
    }

    return (
        <ImageButton
        style={{
            view: basketStyle.tabButton_view,
            button: basketStyle.tabButton_button,
            text: basketStyle.tabButton_text,
            image: basketStyle.tabButton_image,
        }}
        colorButton={{backgroundColor: 'lightcoral', clickColor: '#f0f0f0'}}
        text="Empty basket"
        src={emptyBasketIcon}
        alt="Empty basket"
        onClick={deleteProductsFromBasket}
        disableDefaultStyle/>
    );
};

export default EmptyBasket;