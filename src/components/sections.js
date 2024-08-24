import React, { useState, useRef, useEffect } from "react";
import './sections.css'
import ToggleSwitch from "./toggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleInfo, faPen } from '@fortawesome/free-solid-svg-icons'

function ListSort() {
  const [ListItems, setListItems] = useState(["Profile Summary", "Academic and Cocurricular Achievements", "Summer Internship Experience", "Work Experience", "Projects", "Certifications", "Leadership Positions", "Extracurricular", "Education"]);
  const [newListItem, setNewListItem] = useState("");
  const [editableItem, setEditableItem] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const initialListItems = useRef([...ListItems]);

  // save reference for dragItem and dragOverItem
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // const handle drag sorting
  const handleSort = () => {
    // duplicate items
    let _ListItems = [...ListItems];

    // remove and save the dragged item content
    const draggedItemContent = _ListItems.splice(dragItem.current, 1)[0];

    // switch the position
    _ListItems.splice(dragOverItem.current, 0, draggedItemContent);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array
    setListItems(_ListItems);
    setHasChanges(true);
  };

  // handle name change
  const handleNameChange = (e, index) => {
    const updatedListItems = [...ListItems];
    updatedListItems[index] = e.target.value;
    setListItems(updatedListItems);
    setHasChanges(true);
  };

  // handle edit button click
  const handleEditClick = (index) => {
    setEditableItem(index);
  };

  useEffect(() => {
    const hasChanges = ListItems.some((item, index) => item !== initialListItems.current[index]);
    setHasChanges(hasChanges);
  }, [ListItems]);

  return (
    <div className='container'>
      <div className='header_container'>
        Select your sections
      </div>

      <div className="list-sort">
        {ListItems.map((item, index) => (
          <div
            key={index}
            className="list-item"
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className='hamburger'><FontAwesomeIcon icon={faBars} /></div>
            <div className='info'><FontAwesomeIcon icon={faCircleInfo} /></div>
            {editableItem === index ? (
              <input
                type="text"
                value={item}
                onChange={(e) => handleNameChange(e, index)}
                onBlur={() => setEditableItem(null)}
              />
            ) : (
              <div>{item}</div>
            )}
            <div
              className="pen"
              onClick={() => handleEditClick(index)}
            >
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="toggle"><ToggleSwitch /></div>
          </div>
        ))}
      </div>

      {hasChanges && (
        <div className="button-element">
          <button>Save and Next</button>
        </div>
      )}
    </div>
  );
}

export default ListSort;
