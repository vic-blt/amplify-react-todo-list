import React from "react";

export default function FilterButton({name, setFilter, isPressed}) {
    return (
        <button type="button" className="btn toggle-btn" aria-pressed={isPressed} onClick={() => setFilter(name)}>
            <span>{name}</span>
        </button>
    )
}
