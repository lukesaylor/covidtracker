import React, {useEffect, useState} from 'react';
import styles from './NewsTicker.module.css';
import { currentStateNews } from '../../api';
 
 



const NewsTicker = ({currentStateMetadata}) => {
     const stateNews = currentStateMetadata ? ( currentStateNews(currentStateMetadata.stateName.replace(/ /g,"+"))):(currentStateNews("USA"))
     
 
    return(
        currentStateMetadata ? (
        <div> </div>):(<h1>helllo</h1>)
        
    ) }

export default NewsTicker;

 