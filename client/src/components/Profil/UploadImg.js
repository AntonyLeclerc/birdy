import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = ( props ) => {

    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file);

        dispatch(uploadPicture(data, userData._id));

    }

    
    
    return (
        <form action='' onSubmit={handlePicture} className='upload-pic'>
            <label htmlFor='file' id="labelPicture">{file ? file.name.substring(0,10) + "..." : "Sélectionnez un fichier"}</label>
            <input
                type="file"
                id="file"
                name="file"
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setFile(e.target.files[0])}
            />
            {
                file ? (
                    <div>
                        <input type="submit" value="Confirmer"/>
                        <input type="reset" onClick={props.pic} value="Annuler"/>
                    </div>
                ) :
                ( <input type="reset" onClick={props.pic} value="Annuler"/> 

                )
            }
        </form>
    );
};

export default UploadImg;