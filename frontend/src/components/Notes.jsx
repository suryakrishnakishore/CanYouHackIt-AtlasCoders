import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../public/gpt2.css"

function Notes() {
    const { userEmail, ind } = useParams();
    const [note, setNote] = useState(null);
    useEffect(() => {
        async function fetchNote() {
            try {
                const responce = await axios.get(`http://localhost:3000/todos/${userEmail}/${ind}`);
                console.log(responce.data);
                setNote(responce.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchNote();
    }, [])

    
    return (
        <div className="container">
            <header>
                {note && <h1 className="title" style={{
                    fontSize: "2.5rem",
                    color: "rgb(37, 181, 181)",
                    marginBottom: "10px"
                }} >{note.title}</h1>}
                {note && <p className="date">{(note.date).slice(0, 10)}</p>}
            </header>
            <section className="body-content">
                {note && <p>{note.body}</p>}
            </section>
        </div>);

    //note && console.log(note);
}
export default Notes;