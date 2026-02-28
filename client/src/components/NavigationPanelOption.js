import React from "react";
import './NavigationPanelOption.css';

function NavigationPanelOption(props){
    return(
        <div className="navigationPanelOption">
            <props.Icon />
            <p>{props.text}</p>
        </div>
    ); 
}

export default NavigationPanelOption;