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
        styleView={basketStyle.button_view}
        styleButton={basketStyle.button_button}
        styleText={basketStyle.button_text}
        styleImage={basketStyle.button_image}
        colorButton={{backgroundColor: 'lightcoral', clickColor: '#f0f0f0'}}
        text="Empty basket"
        src={emptyBasketIcon}
        alt="Empty basket"
        onClick={deleteProductsFromBasket}
        disableDefaultStyle/>
    );
};

export default EmptyBasket;