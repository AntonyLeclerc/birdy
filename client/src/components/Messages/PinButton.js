import React, { useContext, useEffect, useState } from "react";
import PinIcon from "../../img/icons/pin.png";
import PinnedIcon from "../../img/icons/pinned.png";
import "./PinButton.css";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import { pinMessage, unpinMessage } from "../../actions/message.actions";

const PinButton = ({ post }) => {

  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const [isPinned, setIsPinned] = useState(false);

  const handlePinMsg = () => {
    if (window.confirm("Voulez vous épingler ce message ?")) {
        dispatch(pinMessage(post._id, uid));
        setIsPinned(true);
    }
}


const unpinMsg = () => {
    if (window.confirm("Voulez vous déépingler ce message ?")) {
        dispatch(unpinMessage(uid));
        setIsPinned(false);
    }
}

  useEffect(() => {
    if (userData.pinnedMessage === post._id) setIsPinned(true);
    else setIsPinned(false);
  }, [uid, userData.pinnedMessage, isPinned, post._id]);

  return (
    <div>
      {isPinned ? (
        <img src={PinnedIcon} alt="pin" className="pin-button" onClick={unpinMsg}/>
      ) : (
        <img src={PinIcon} alt="pin" className="pin-button" onClick={handlePinMsg}/>
      )}
    </div>
  );
};

export default PinButton;
