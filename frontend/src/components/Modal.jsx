import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VoiceToText from "./VoiceToTest";

function Modal({ mode, setShowMode, task, n }) {
  const EditMode = n === "EDIT" ? true : false;
  const {userEmail}= useParams();
  // const navigate = useNavigate();
  console.log(task);
  console.log(EditMode);
  const [data, setData] = useState({
    user_email: EditMode ? task.user_email : userEmail,
    title: EditMode ? task.title : "",
    body: EditMode ? task.body : "",
    date: EditMode ? "" : new Date(),
  });

  function handleChange(event) {
    console.log(event.target);
    const { name, value } = event.target;
    setData((prev) => {
      if (name === "title") {
        return {
          user_email: prev.user_email,
          title: value,
          body: prev.body,
          date: prev.date,
        };
      } else if (name === "body") {
        return {
          user_email: prev.user_email,
          title: prev.title,
          body: value,
          date: prev.date,
        };
      }
    });
  }
  function handleEdit(event) {
    console.log(event);
    // const { task } = event.target;
    event.preventDefault();
    async function PutData() {
      try {
        const responce = await axios.put(
          `http://localhost:3000/todos/${task.id}`,
          {
            user_id: task.id,
            user_email: data.user_email,
            title: data.title,
            body: data.body,
            date: task.date,
          }
        );
        console.log(responce.data);
      } catch (err) {
        console.log(err);
      }
    }
    PutData();
    setShowMode(false);
    window.location.reload(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(typeof data);
    console.log(data);
    async function PostData() {
      try {
        const responce = await axios.post(`http://localhost:3000/todos`, data);
        console.log(responce.data);
      } catch (err) {
        console.log(err);
      }
    }
    PostData();
    setShowMode(false);
    window.location.reload(false);
  }

  return (
    <div className="overlay">
      <div className="buttons-container">
        <button className="btn1" type="submit">
          ADD NEW
        </button>
        <button className="btn2" type="submit">
          SIGN OUT
        </button>
      </div>
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {n} your task</h3>
          <button onClick={() => setShowMode(false)}>X</button>
        </div>
        <form action="" method="post">
          <input
            type="text"
            name="title"
            maxLength={30}
            placeholder="Your task goes Here"
            value={data.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="range " style={{fontSize: "20px"}}>Write your body</label>
          {/* <input
            id="textarea"
            type="textarea"
            
            // style={{height: "200px",overflowY: "scroll",overflowX: "scroll"}}
            name="body"
            value={data.body}
            onChange={handleChange}
          /> */}
          <VoiceToText
            value={data.body}
            onChange={handleChange}
          ></VoiceToText>
          <input
            className="submit"
            type="submit"
            task={task}
            onClick={EditMode ? handleEdit : handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}

export default Modal;
