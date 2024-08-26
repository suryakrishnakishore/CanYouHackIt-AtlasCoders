import React, { useEffect, useState } from "react";
import ListHeader from "./ListHeader";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ListItem() {
  const { userEmail } = useParams();
  const [tasks, setTasks] = useState(null);
  let navigate = useNavigate();
  const auth = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:3000/todos/${userEmail}`
        );
        //  const json = await responce.json();
        console.log(responce.data);
        setTasks((prev) => {
          return [...responce.data];
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Sort the tasks according to dates...
  console.log(tasks);

  let sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));
  console.log(sortedTasks);
  const [edit, setEdit] = useState({});
  const [showMode, setShowMode] = useState(false);
  function handleDelete(event, id) {
    event.preventDefault();
    // const {task} = event.target;
    async function DeleteData() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/todos/${id}`
        );
      } catch (err) {
        console.log(err);
      }
    }
    DeleteData();
    window.location.reload(false);
  }

  function handleEdit(event, task) {
    event.preventDefault();
    setShowMode(true);
    setEdit(task);
  }

  function handleNotes(event, ind) {
    event.preventDefault();
    navigate(`/todos/${userEmail}/${ind}`);
  }

  return (
    <div className="todo-container">
      {showMode!==true && <ListHeader listName={"My NOTES"}></ListHeader>}
      {tasks?.map((task) => (

        <div className="list-item" >
            <div className="info-container" key={task.id}>
              <div className="list-items" onClick={(e) => handleNotes(e, task.id)}>
              <label htmlFor="listItem">{task.title}</label>
              </div>
            <div
              className="buttons-container2"
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "right",
              }}
            >
              <button
                className="btn3"
                type="submit"
                onClick={(e) => handleEdit(e, task)}
              >
                Edit
              </button>
              <button
                className="btn4"
                type="submit"
                task={task}
                onClick={(e) => handleDelete(e, task.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
            </div>
            {showMode && (
              <Modal
                mode={showMode}
                setShowMode={setShowMode}
                task={edit}
                n={"EDIT"}
              ></Modal>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListItem;
