import { useState, useEffect } from "react";
import "./App.css";

const notes_template = [
  {
    id: Math.floor(Math.random() * 1000000),
    title: "Welcome to notes app",
    timestamp: new Date().toISOString(),
    updated: new Date().toLocaleString(undefined, {
      dateStyle: "full",
      timeStyle: "short",
    }),
    body: "Welcome to the new notes app which is created using react",
  },
];

function App() {
  const [notes, setNotes] = useState(notes_template);
  const [previewnote, setPreviewnote] = useState(notes[0]);

  const addNote = () => {
    const newNotes = [...notes];
    newNotes.push({
      id: Math.floor(Math.random() * 1000000),
      title: "New Note",
      timestamp: new Date().toISOString(),
      updated: new Date().toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short",
      }),
      body: "",
    });
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    let updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const selectpreviewnote = (id) => {
    const previewnotedata = notes.filter((note) => note.id === id)[0];
    setPreviewnote(previewnotedata);
  };

  const updateNote = ({ attr, id, value }) => {
    console.log("update note triggered", attr, id, value);
    console.log(notes);
    let updatedData = notes
      .filter((note) => {
        if (note.id === id) {
          return true;
        }
        return false;
      })
      .map((note) => {
        if (attr === "title") {
          return {
            ...note,
            title: value,
            timestamp: new Date().toISOString(),
            updated: new Date().toLocaleString(undefined, {
              dateStyle: "full",
              timeStyle: "short",
            }),
          };
        } else if (attr === "body") {
          return {
            ...note,
            body: value,
            timestamp: new Date().toISOString(),
            updated: new Date().toLocaleString(undefined, {
              dateStyle: "full",
              timeStyle: "short",
            }),
          };
        }
        return note;
      })[0];
    console.log(updatedData);
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return updatedData;
      }
      return note;
    });
    setNotes(updatedNotes);
    setPreviewnote(updatedData);
  };

  useEffect(() => {
    let localNotes = JSON.parse(localStorage.getItem("notesapp-notes"));
    if (localNotes) {
      setNotes(localNotes);
    } else {
      localStorage.setItem("notesapp-notes", JSON.stringify(notes_template));
    }
  }, []);

  useEffect(() => {
    let tempNotes = [...notes];
    tempNotes.sort((a, b) =>
      new Date(a.updated) > new Date(b.updated) ? -1 : 1
    );
    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    setPreviewnote(notes[0])
  }, [notes]);

  return (
    <div className="notes" id="app">
      <div className="notes__sidebar">
        <button className="notes__add" onClick={() => addNote()} type="button">
          Add Note
        </button>
        <div className="notes__list">
          {notes.map((note) => {
            return (
              <div
                className="notes__list-item"
                key={note.id}
                onClick={() => selectpreviewnote(note.id)}
                onDoubleClick={() => deleteNote(note.id)}
              >
                <div className="notes__small-title">{note.title}</div>
                <div className="notes__small-body">{note.body}</div>
                <div className="notes__small-updated">{note.updated}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="notes__preview" id={previewnote.id}>
        <input
          type="text"
          className="notes__title"
          placeholder="Enter a title"
          onChange={(e) =>
            updateNote({
              attr: "title",
              id: previewnote.id,
              value: e.target.value,
            })
          }
          value={previewnote.title}
        />
        <textarea
          className="notes__body"
          onChange={(e) =>
            updateNote({
              attr: "body",
              id: previewnote.id,
              value: e.target.value,
            })
          }
          value={previewnote.body}
        />
      </div>
    </div>
  );
}

export default App;
