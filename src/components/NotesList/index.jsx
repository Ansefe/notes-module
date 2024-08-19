import PropTypes from "prop-types";
import { ALL, DEFAULT_NOTE, menuOptions, rawNotes } from "../utils/constants";
import { useMemo, useState } from "react";
import NoteVisualization from "../NoteVisualization";
import "./styles.css";
import ConfirmationModal from "../ConfirmationModal";
import { formatDate, parseDateNotes } from "../utils/helpers";

const NotesList = ({ activeTab }) => {
  const [selectedNote, setSelectedNote] = useState({});
  const [isCreatingNote, setIsCreateNote] = useState(false);
  const [notesData, setNotesData] = useState(parseDateNotes(rawNotes));
  const [showModal, setShowModal] = useState(false);

  const { filterdList, count, labelCurrentTab } = useMemo(() => {
    const filterdList =
      activeTab === ALL
        ? notesData
        : notesData.filter(({ type }) => type === activeTab);
    return {
      filterdList,
      count: filterdList.length || 0,
      labelCurrentTab: menuOptions.find(({ code }) => code === activeTab)
        ?.label,
    };
  }, [activeTab, notesData]);

  const handleSelectedNote = (data) => {
    setIsCreateNote(false);
    setSelectedNote(data);
  };
  const handleIsCreating = () => {
    setSelectedNote(DEFAULT_NOTE);
    setIsCreateNote(!isCreatingNote);
  };

  const handleCreateNote = (newNote) => {
    const newNotes = [...notesData];
    newNotes.push({
      ...newNote,
      type: activeTab,
      lastEdit: formatDate(new Date()),
      id: notesData.length + 1,
    });
    setNotesData(newNotes);
    handleIsCreating();
  };
  console.log({ notesData });

  const handleEditNote = (updatedNote) => {
    const idToBeUpdated = updatedNote?.id;
    const newNotes = [...notesData];
    const indexToUpdate = notesData.findIndex(({ id }) => idToBeUpdated === id);
    console.log({ notesData, updatedNote, indexToUpdate });
    newNotes[indexToUpdate] = updatedNote;
    setSelectedNote(updatedNote);
    console.log({ newNotes });
    setNotesData(newNotes);
  };

  const handleDeleteNote = (noteToBeDeleted) => {
    const idToBeDeleted = noteToBeDeleted?.id;
    const newNotes = [...notesData];
    const indexToDelete = notesData.findIndex(({ id }) => idToBeDeleted === id);
    console.log({ notesData, indexToDelete });
    newNotes.splice(indexToDelete, 1);
    setSelectedNote({});
    console.log({ newNotes });
    setNotesData(newNotes);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleConfirmAction = () => {
    handleDeleteNote(selectedNote);
    handleCloseModal();
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-6 mt-3 max-height-645 d-flex flex-column">
          {/* Mostrar el título y la cantidad de notas */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3 pe-5">
              <h4>{labelCurrentTab} Notes</h4>
              <span className="badge bg-secondary">{count}</span>
              <button className="btn btn-primary" onClick={handleIsCreating}>
                + Add {activeTab === ALL ? "" : labelCurrentTab} Note
              </button>
            </div>
          </div>

          {/* Listado de notas */}
          <div className="custom-scrollbar flex-grow-1 pe-4">
            {count > 0 ? (
              filterdList.map((note) => (
                <div
                  key={"note" + note.id}
                  className="card mb-3"
                  onClick={() => handleSelectedNote(note)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{`${note.employer}, Owner`}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Last Edit: {note.lastEdit}
                    </h6>
                    <p className="card-text">{note.notes}</p>
                    <span
                      onClick={handleOpenModal}
                      className="card-link text-danger"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No notes available.</p>
            )}
          </div>
        </div>
        <NoteVisualization
          selectedNote={selectedNote}
          isCreatingNote={isCreatingNote}
          handleEditNote={handleEditNote}
          handleOpenModal={handleOpenModal}
          handleIsCreating={handleIsCreating}
          handleCreateNote={handleCreateNote}
        />
      </div>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmAction}
      />
    </div>
  );
};

NotesList.propTypes = {
  activeTab: PropTypes.number,
};

export default NotesList;
