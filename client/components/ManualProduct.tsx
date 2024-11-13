import boxIcon from "../assets/img/box.png";
import ImageButton from "./ImageButton";
import React, { useEffect } from "react";
import { useState } from "react";
import { basketStyle } from "../styles/Basket.style";

type ManualProductType = {
    getClick(isClick: boolean): void;
    setClick: boolean,
};

const ManualProduct = ({getClick, setClick}: ManualProductType) => {
    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
        setIsClick(setClick)
        getClick(setClick);
    }, [setClick]);

    useEffect(() => {
        setIsClick(isClick)
        getClick(isClick);
    }, [isClick]);

    return ( 
        <ImageButton
        style={{
            button: basketStyle.tabButton_button,
            text: basketStyle.tabButton_text,
            image: basketStyle.tabButton_image,
        }}
        colorButton={{backgroundColor: 'lightgreen', clickColor: '#f0f0f0'}}
        text="Add manually"
        src={boxIcon}
        alt="Add manually"
        onClick={() => setIsClick(!isClick)}
        disableDefaultStyle/>
    );
};

export default ManualProduct;