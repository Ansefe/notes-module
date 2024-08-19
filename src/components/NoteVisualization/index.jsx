import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DEFAULT_NOTE } from "../utils/constants";

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
      <div className="col-md-6 mt-3">
        {isCreatingNote || selectedNote.id ? (
          <>
            {!isCreatingNote && (
              <div className="d-flex justify-content-end mb-4">
                <button
                  className="btn btn-danger me-2"
                  onClick={handleOpenModal}
                >
                  Delete Note
                </button>
                <button className="btn btn-secondary" onClick={handleIsEditing}>
                  Edit
                </button>
              </div>
            )}
            <div>
              {!isCreatingNote && (
                <>
                  <h5 className="card-title">{`${formValues.employer}, Owner`}</h5>
                  <h6 className="card-subtitle mb-2 text-muted text-end">
                    {formValues.lastEdit}
                  </h6>
                </>
              )}
              {isCreatingNote && (
                <input
                  type="text"
                  className="form-control mb-3 mt-3"
                  id="exampleFormControlInput1"
                  placeholder="Insert employer's name"
                  value={formValues.employer}
                  onChange={handleChangeEmployer}
                />
              )}
              {(isEditing || isCreatingNote) && (
                <>
                  <textarea
                    className="form-control"
                    value={formValues.notes}
                    onChange={handleContentChange}
                    rows={10}
                  />
                  <div
                    className={`text-${
                      remainingChars < 400 ? "danger" : "muted"
                    } text-end`}
                  >
                    {remainingChars} characters remaining
                  </div>
                </>
              )}
            </div>
            {!isEditing && !isCreatingNote && (
              <div className="">{formValues.notes}</div>
            )}
            {(isEditing || isCreatingNote) && (
              <>
                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-white me-2"
                    onClick={
                      isCreatingNote ? handleIsCreating : handleCancelEdit
                    }
                  >
                    {isCreatingNote ? "Cancel Create" : "Cancel Edit"}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={remainingChars < 0}
                  >
                    {isCreatingNote ? "Save Note" : "Update Note"}
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          !isCreatingNote && <p>Please select a note from the list.</p>
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
