import emptyBasketIcon from '../assets/img/basket_empty.png'
import ImageButton from "./ImageButton";
import React, { useEffect, useState } from "react";
import { basketStyle } from "../styles/Basket.style";
import { deleteAllProductsDB } from '../services/db';

type EmptyBasketType = {
    getClick?(isClick: boolean): void,
    setClick?: boolean,
};

const EmptyBasket = ({getClick, setClick}: EmptyBasketType) => {

    const deleteProductsFromBasket = async () => {
        getClick && getClick(true);
        await deleteAllProductsDB();
    }

    useEffect(() => {
        if (getClick !== undefined && setClick !== undefined) getClick(setClick);
    }, [setClick]);

    return (
        <ImageButton
        style={{
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