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
            view: basketStyle.button_view,
            button: basketStyle.button_button,
            text: basketStyle.button_text,
            image: basketStyle.button_image,
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