import React, { useContext } from 'react';
import DeleteIcon from '../../img/icons/delete.png'
import "./DeleteComment.css"
import { useDispatch } from 'react-redux';
import { deleteComment, getMessages } from '../../actions/message.actions';
import { UidContext } from '../AppContext';

const DeleteComment = ({ commentaire, msgId }) => {

    const dispatch = useDispatch();
    const uid = useContext(UidContext);

    const handleDeleteComment = () => {
        if (commentaire._id) { // Vérifie si l'ID du commentaire est défini
            console.log(`Comment to delete :  ${commentaire._id}`)
            console.log(`Post to modify :  ${msgId}`)
            dispatch(deleteComment(commentaire._id, msgId)).then(() => {
                // Appeler getMessages après que le commentaire est supprimé
                dispatch(getMessages());
            });
        } else {
            console.log("Impossible de supprimer le commentaire : ID non défini")
        }
    }

    return (
        (commentaire.commenterId === uid) && <div className='delete-comment' onClick={() => {if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {handleDeleteComment()}}}>
            <img src={DeleteIcon} alt="delete-icon"/>
        </div>
    );
};

export default DeleteComment;
