import boxIcon from "../assets/img/box.png";
import ImageButton from "./ImageButton";
import React from "react";
import { useState } from "react";
import { basketStyle } from "../styles/Basket.style";
import Popup from "./Popup";

const ManualProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [popupIsVisible, setPopupIsVisible] = useState(false);
    
    const openPopup = () => {
        setPopupIsVisible(true);
    };
    
    return (
        <>        
        <ImageButton
        styleView={basketStyle.button_view}
        styleButton={basketStyle.button_button}
        styleText={basketStyle.button_text}
        styleImage={basketStyle.button_image}
        colorButton={{backgroundColor: 'lightgreen', clickColor: '#f0f0f0'}}
        text="Add manually"
        src={boxIcon}
        alt="Add manually"
        onClick={openPopup}
        disableDefaultStyle/>
        <Popup
            isVisible={popupIsVisible}
            data={{type: 'card'}}/>
        </>
    );
};

export default ManualProduct;