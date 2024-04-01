import React, { useEffect, useState } from "react";
import SelectNotes from "./components/SelectNotes/SelectNotes";
import NotesSection from "./components/NotesSection/NotesSection";
import "./App.css";
import AppContext from "./context/AppContext";

function App() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);
  const [noteHeadings, setNoteHeadings] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : ""
  );
  const [hide, setHide] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setHide(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setCurrentGroup(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        modal,
        toggleModal,
        noteHeadings,
        setNoteHeadings,
        hide,
        setHide,
        isMobile,
        setIsMobile,
        currentGroup,
        setCurrentGroup,
      }}
    >
      <div className="App">
        <SelectNotes />
        <NotesSection />
      </div>
    </AppContext.Provider>
  );
}

export default App;
