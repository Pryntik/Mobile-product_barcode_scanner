import emptyBasketIcon from '../assets/img/basket_empty.png'
import ImageButton from "./ImageButton";
import React, { useEffect } from "react";
import { basketStyle } from "../styles/Basket.style";
import { deleteAllProductsDB } from '../services/db';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../styles/Theme.style';

type EmptyBasketType = {
    getClick?(isClick: boolean): void,
    setClick?: boolean,
};

const EmptyBasket = ({getClick, setClick}: EmptyBasketType) => {
    const theme = useTheme() as ThemeType;

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
        colorButton={{backgroundColor: 'lightcoral', clickColor: theme.colors.click}}
        text="Empty basket"
        alt="Empty basket"
        src={emptyBasketIcon}
        onClick={deleteProductsFromBasket}
        disableDefaultStyle/>
    );
};

export default EmptyBasket;