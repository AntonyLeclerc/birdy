import React from 'react';
import DeleteIcon from '../../img/icons/delete.png'
import { deleteMessage } from '../../actions/message.actions';
import { useDispatch } from 'react-redux';

const DeleteButton = ({id}) => {

    const dispatch = useDispatch();

    const deleteMsg = () => {
        dispatch(deleteMessage(id))
      }
    return (
        <div onClick={() => {
            if (window.confirm("Voulez vous vraiment supprimer ce message ?")){
                deleteMsg();
            }
        }} className="deleteButton">
            <img src={DeleteIcon} alt="delete" className="modify-msg-button" title="Modifier" />
        </div>
    );
};

export default DeleteButton;