import PropTypes from "prop-types";
import {
  ALL,
  DEFAULT_NOTE,
  GENERAL,
  menuOptions,
  rawNotes,
} from "../utils/constants";
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
      type: activeTab === ALL ? GENERAL : activeTab,
      lastEdit: formatDate(new Date()),
      id: notesData.length + 1,
    });
    setNotesData(newNotes);
    handleIsCreating();
  };

  const handleEditNote = (updatedNote) => {
    const idToBeUpdated = updatedNote?.id;
    const newNotes = [...notesData];
    const indexToUpdate = notesData.findIndex(({ id }) => idToBeUpdated === id);
    newNotes[indexToUpdate] = updatedNote;
    setSelectedNote(updatedNote);
    setNotesData(newNotes);
  };

  const handleDeleteNote = (noteToBeDeleted) => {
    const idToBeDeleted = noteToBeDeleted?.id;
    const newNotes = [...notesData];
    const indexToDelete = notesData.findIndex(({ id }) => idToBeDeleted === id);
    newNotes.splice(indexToDelete, 1);
    setSelectedNote({});
    setNotesData(newNotes);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleConfirmAction = () => {
    handleDeleteNote(selectedNote);
    handleCloseModal();
  };

  return (
    <div className="">
      <div className="d-flex">
        <div className="max-height-645 d-flex flex-column">
          {/* título y la cantidad de notas */}
          <div className="d-flex justify-content-between align-items-center notes-resume">
            <span className="note-type fw-bold">
              {labelCurrentTab} Notes
              <span className="badge bg-secondary text-dark rounded-circle count fw-bold bg-light">
                {count}
              </span>
            </span>
            <button
              className="btn btn-dark d-flex align-items-center add-button fw-medium"
              onClick={handleIsCreating}
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_5646_13604)">
                  <path
                    d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM8.5 5C8.5 4.86739 8.44732 4.74021 8.35355 4.64645C8.25979 4.55268 8.13261 4.5 8 4.5C7.86739 4.5 7.74021 4.55268 7.64645 4.64645C7.55268 4.74021 7.5 4.86739 7.5 5V8H4.5C4.36739 8 4.24021 8.05268 4.14645 8.14645C4.05268 8.24021 4 8.36739 4 8.5C4 8.63261 4.05268 8.75979 4.14645 8.85355C4.24021 8.94732 4.36739 9 4.5 9H7.5V12C7.5 12.1326 7.55268 12.2598 7.64645 12.3536C7.74021 12.4473 7.86739 12.5 8 12.5C8.13261 12.5 8.25979 12.4473 8.35355 12.3536C8.44732 12.2598 8.5 12.1326 8.5 12V9H11.5C11.6326 9 11.7598 8.94732 11.8536 8.85355C11.9473 8.75979 12 8.63261 12 8.5C12 8.36739 11.9473 8.24021 11.8536 8.14645C11.7598 8.05268 11.6326 8 11.5 8H8.5V5Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5646_13604">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div className="add-text">
                Add {activeTab === ALL ? "" : labelCurrentTab} Note
              </div>
            </button>
          </div>

          {/* Listado de notas */}
          <div className="custom-scrollbar flex-grow-1">
            {count > 0 ? (
              filterdList.map((note) => (
                <div
                  key={"note" + note.id}
                  className={`border-style ${
                    selectedNote.id === note.id ? "note-selected" : ""
                  }`}
                  onClick={() => handleSelectedNote(note)}
                >
                  <div className="">
                    <h5 className="employer-name fw-bold">{`${note.employer}, Owner`}</h5>
                    <h6 className="last-edit">Last Edit: {note.lastEdit}</h6>
                    <p className="note-text">{note.notes}</p>
                    <button
                      onClick={handleOpenModal}
                      className="fw-medium delete-btn"
                    >
                      Delete
                    </button>
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
