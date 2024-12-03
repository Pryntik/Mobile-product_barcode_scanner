import boxIcon from "../assets/img/box.png";
import ImageButton from "./ImageButton";
import React, { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../styles/Theme.style";
import { historyStyle } from "../styles/History.style";

type ManualPaymentType = {
    getClick?(isClick: boolean): void;
    setClick?: boolean,
};

const ManualPayment = ({getClick, setClick}: ManualPaymentType) => {
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
            button: historyStyle.tabButton_button,
            text: historyStyle.tabButton_text,
            image: historyStyle.tabButton_image,
        }}
        colorButton={{backgroundColor: 'lightgreen', clickColor: theme.colors.click}}
        text="Add manually"
        alt="Add manually"
        src={boxIcon}
        onClick={manualClick}
        disableDefaultStyle/>
    );
};

export default ManualPayment;