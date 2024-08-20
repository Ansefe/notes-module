import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DEFAULT_NOTE } from "../utils/constants";
import "./styles.css";

const NoteVisualization = ({
  selectedNote = {},
  isCreatingNote = false,
  handleEditNote,
  handleOpenModal,
  handleIsCreating,
  handleCreateNote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(DEFAULT_NOTE);
  const [remainingChars, setRemainingChars] = useState(
    500 - (selectedNote?.notes?.length || 0)
  );

  const handleIsEditing = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setFormValues(selectedNote);
    setIsEditing(false);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setFormValues((prev) => ({
      ...prev,
      notes: newContent,
    }));
    setRemainingChars(500 - newContent.length);
  };

  const handleChangeEmployer = (e) => {
    const newContent = e.target.value;
    setFormValues((prev) => ({
      ...prev,
      employer: newContent,
    }));
  };

  const handleSave = () => {
    if (isCreatingNote) {
      handleCreateNote(formValues);
    } else {
      handleEditNote(formValues);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    setIsEditing(false);
    if (isCreatingNote) {
      setFormValues(DEFAULT_NOTE);
    } else {
      setFormValues(selectedNote);
    }
  }, [selectedNote, isCreatingNote]);

  return (
    <>
      <div className="container-note-preview">
        {isCreatingNote || selectedNote.id ? (
          <div className="note-visualization-container">
            {!isCreatingNote && (
              <div className="d-flex justify-content-end edit-buttons">
                <button
                  className="btn border border-danger text-danger d-flex align-items-center delete-button fw-medium"
                  onClick={handleOpenModal}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_5646_11376)">
                      <path
                        d="M2.5 1C2.23478 1 1.98043 1.10536 1.79289 1.29289C1.60536 1.48043 1.5 1.73478 1.5 2V3C1.5 3.26522 1.60536 3.51957 1.79289 3.70711C1.98043 3.89464 2.23478 4 2.5 4H3V13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15H11C11.5304 15 12.0391 14.7893 12.4142 14.4142C12.7893 14.0391 13 13.5304 13 13V4H13.5C13.7652 4 14.0196 3.89464 14.2071 3.70711C14.3946 3.51957 14.5 3.26522 14.5 3V2C14.5 1.73478 14.3946 1.48043 14.2071 1.29289C14.0196 1.10536 13.7652 1 13.5 1H10C10 0.734784 9.89464 0.48043 9.70711 0.292893C9.51957 0.105357 9.26522 0 9 0H7C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1H2.5ZM5.5 5C5.63261 5 5.75979 5.05268 5.85355 5.14645C5.94732 5.24021 6 5.36739 6 5.5V12.5C6 12.6326 5.94732 12.7598 5.85355 12.8536C5.75979 12.9473 5.63261 13 5.5 13C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V5.5C5 5.36739 5.05268 5.24021 5.14645 5.14645C5.24021 5.05268 5.36739 5 5.5 5ZM8 5C8.13261 5 8.25979 5.05268 8.35355 5.14645C8.44732 5.24021 8.5 5.36739 8.5 5.5V12.5C8.5 12.6326 8.44732 12.7598 8.35355 12.8536C8.25979 12.9473 8.13261 13 8 13C7.86739 13 7.74021 12.9473 7.64645 12.8536C7.55268 12.7598 7.5 12.6326 7.5 12.5V5.5C7.5 5.36739 7.55268 5.24021 7.64645 5.14645C7.74021 5.05268 7.86739 5 8 5ZM11 5.5V12.5C11 12.6326 10.9473 12.7598 10.8536 12.8536C10.7598 12.9473 10.6326 13 10.5 13C10.3674 13 10.2402 12.9473 10.1464 12.8536C10.0527 12.7598 10 12.6326 10 12.5V5.5C10 5.36739 10.0527 5.24021 10.1464 5.14645C10.2402 5.05268 10.3674 5 10.5 5C10.6326 5 10.7598 5.05268 10.8536 5.14645C10.9473 5.24021 11 5.36739 11 5.5Z"
                        fill="#DC3545"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5646_11376">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="">Delete Note</div>
                </button>
                <button
                  className="btn btn-dark text-white d-flex align-items-center edit-button fw-medium"
                  onClick={handleIsEditing}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.502 1.93844C15.5954 2.03216 15.6479 2.1591 15.6479 2.29144C15.6479 2.42378 15.5954 2.55072 15.502 2.64444L14.459 3.68844L12.459 1.68844L13.502 0.64444C13.5958 0.550705 13.7229 0.498047 13.8555 0.498047C13.9881 0.498047 14.1152 0.550705 14.209 0.64444L15.502 1.93744V1.93844ZM13.752 4.39444L11.752 2.39444L4.939 9.20844C4.88396 9.26347 4.84253 9.33058 4.818 9.40444L4.013 11.8184C3.9984 11.8624 3.99633 11.9096 4.00701 11.9548C4.0177 11.9999 4.04072 12.0411 4.07351 12.0739C4.10629 12.1067 4.14755 12.1297 4.19267 12.1404C4.23779 12.1511 4.28499 12.149 4.329 12.1344L6.743 11.3294C6.81676 11.3052 6.88387 11.2641 6.939 11.2094L13.752 4.39444Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 13.4984C1 13.8963 1.15804 14.2778 1.43934 14.5591C1.72064 14.8404 2.10218 14.9984 2.5 14.9984H13.5C13.8978 14.9984 14.2794 14.8404 14.5607 14.5591C14.842 14.2778 15 13.8963 15 13.4984V7.49844C15 7.36583 14.9473 7.23866 14.8536 7.14489C14.7598 7.05112 14.6326 6.99844 14.5 6.99844C14.3674 6.99844 14.2402 7.05112 14.1464 7.14489C14.0527 7.23866 14 7.36583 14 7.49844V13.4984C14 13.631 13.9473 13.7582 13.8536 13.852C13.7598 13.9458 13.6326 13.9984 13.5 13.9984H2.5C2.36739 13.9984 2.24021 13.9458 2.14645 13.852C2.05268 13.7582 2 13.631 2 13.4984V2.49844C2 2.36583 2.05268 2.23866 2.14645 2.14489C2.24021 2.05112 2.36739 1.99844 2.5 1.99844H9C9.13261 1.99844 9.25979 1.94576 9.35355 1.85199C9.44732 1.75823 9.5 1.63105 9.5 1.49844C9.5 1.36583 9.44732 1.23865 9.35355 1.14489C9.25979 1.05112 9.13261 0.99844 9 0.99844H2.5C2.10218 0.99844 1.72064 1.15648 1.43934 1.43778C1.15804 1.71908 1 2.10062 1 2.49844V13.4984Z"
                      fill="white"
                    />
                  </svg>
                  <div className="">Edit</div>
                </button>
              </div>
            )}
            <div>
              {!isCreatingNote && (
                <div className="d-flex justify-content-between align-items-center employer-date-container">
                  <span className="employer-name fw-bold p-0">{`${formValues.employer}, Owner`}</span>
                  <span className="text-end last-edit p-0">
                    {formValues.lastEdit}
                  </span>
                </div>
              )}
              {isCreatingNote && (
                <input
                  type="text"
                  className="form-control employer-input"
                  id="exampleFormControlInput1"
                  placeholder="Insert employer's name"
                  value={formValues.employer}
                  onChange={handleChangeEmployer}
                />
              )}
              {(isEditing || isCreatingNote) && (
                <>
                  <textarea
                    className="form-control textarea"
                    value={formValues.notes}
                    onChange={handleContentChange}
                    rows={10}
                    placeholder="Note content"
                  />
                  <div
                    className={`text-${
                      remainingChars < 400 ? "danger" : "muted"
                    } text-end remaining-char fw-bold`}
                  >
                    {remainingChars} characters remaining
                  </div>
                </>
              )}
            </div>
            {!isEditing && !isCreatingNote && (
              <div className="note-content">{formValues.notes}</div>
            )}
            {(isEditing || isCreatingNote) && (
              <>
                <div className="d-flex justify-content-end end-buttons">
                  <button
                    className="btn btn-light text-dark cancel-btn fw-medium"
                    onClick={
                      isCreatingNote ? handleIsCreating : handleCancelEdit
                    }
                  >
                    {isCreatingNote ? "Cancel Create" : "Cancel Edit"}
                  </button>
                  <button
                    className="btn btn-dark save-btn"
                    onClick={handleSave}
                    disabled={remainingChars < 0}
                  >
                    {isCreatingNote ? "Save Note" : "Update Note"}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          !isCreatingNote && (
            <div className=" no-note-selected d-flex justify-content-center align-items-center">
              Please select a note from the list.
            </div>
          )
        )}
      </div>
    </>
  );
};

NoteVisualization.propTypes = {
  selectedNote: PropTypes.object,
  isCreatingNote: PropTypes.bool,
  handleEditNote: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleIsCreating: PropTypes.func.isRequired,
  handleCreateNote: PropTypes.func.isRequired,
};

export default NoteVisualization;
