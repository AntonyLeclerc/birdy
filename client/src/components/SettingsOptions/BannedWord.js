import React from 'react';
import './BannedWord.css'
import UnblockWord from './UnblockWord';

const BannedWord = ( { bword }) => {
    
    return (
        <li>
            <div className='unbanword-container'>
                
                <UnblockWord word={bword}/>
            </div>
        </li>
    );
};

export default BannedWord;