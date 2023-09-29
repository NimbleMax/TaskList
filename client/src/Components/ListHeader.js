import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal";

const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    removeCookie("UserId");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button
          className="create btn btn-success"
          onClick={() => setShowModal(true)}
        >
          Add new
        </button>
        <button className="signout btn btn-tertiary" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
