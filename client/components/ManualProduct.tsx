import boxIcon from "../assets/img/box.png";
import ImageButton from "./ImageButton";
import React, { useEffect } from "react";
import { basketStyle } from "../styles/Basket.style";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../styles/Theme.style";

type ManualProductType = {
    getClick?(isClick: boolean): void;
    setClick?: boolean,
};

const ManualProduct = ({getClick, setClick}: ManualProductType) => {
    const theme = useTheme() as ThemeType;

    const manualClick = () => {
        getClick && getClick(true);
    }

    useEffect(() => {
        getClick && setClick && getClick(setClick);
    }, [setClick]);

    return ( 
        <ImageButton
        style={{
            button: basketStyle.tabButton_button,
            text: basketStyle.tabButton_text,
            image: basketStyle.tabButton_image,
        }}
        colorButton={{backgroundColor: 'lightgreen', clickColor: theme.colors.click}}
        text="Add manually"
        alt="Add manually"
        src={boxIcon}
        onClick={manualClick}
        disableDefaultStyle/>
    );
};

export default ManualProduct;