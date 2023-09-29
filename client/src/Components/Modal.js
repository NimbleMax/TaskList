import React, { useState } from "react";
import { Cookies, useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    userId: editMode ? task.creator_user_id : cookies.UserId,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/tasks/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="overlay">
      <div className="modal-nonbs">
        <div className="form-title-container">
          <h3>Let's {mode} your task!</h3>
          <button
            className="btn btn-tertiary"
            onClick={() => setShowModal(false)}
          >
            x
          </button>
        </div>
        <form>
          <input
            className="form-control"
            required
            maxLength={60}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />

          <input
            required
            type="range"
            min={0}
            max={100}
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />

          <input
            className={`btn btn-${mode === "create" ? "primary" : "warning"}`}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
