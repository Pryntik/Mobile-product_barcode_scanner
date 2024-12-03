import EmptyHistoryIcon from '../assets/img/history_empty.png'
import ImageButton from "./ImageButton";
import React, { useEffect } from "react";
import { historyStyle } from '../styles/History.style';
import { deleteAllProductsDB } from '../services/db';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../styles/Theme.style';

type EmptyHistoryType = {
    getClick?(isClick: boolean): void,
    setClick?: boolean,
};

const EmptyHistory = ({getClick, setClick}: EmptyHistoryType) => {
    const theme = useTheme() as ThemeType;

    const deleteProductsFromHistory = async () => {
        getClick && getClick(true);
        await deleteAllProductsDB();
    }

    useEffect(() => {
        if (getClick !== undefined && setClick !== undefined) getClick(setClick);
    }, [setClick]);

    return (
        <ImageButton
        style={{
            button: historyStyle.tabButton_button,
            text: historyStyle.tabButton_text,
            image: historyStyle.tabButton_image,
        }}
        colorButton={{backgroundColor: 'lightcoral', clickColor: theme.colors.click}}
        text="Empty history"
        alt="Empty history"
        src={EmptyHistoryIcon}
        onClick={deleteProductsFromHistory}
        disableDefaultStyle/>
    );
};

export default EmptyHistory;