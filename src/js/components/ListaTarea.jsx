import React, { useState } from "react";

export function ListaTarea() {

    const [inputValue, setInputValue] = useState("");
    const [lista, setLista] = useState([]);

    return (
        <div style={{ width: "400px" }}>
            <div className="d-flex flex-column align-items-center border-primary bg-light">
                <div style={{ fontSize: "50px", letterSpacing: "2px" }} className="fw-light text-body-tertiary">todos</div>
                <ul className="list-group d-flex justify-content-between w-100">
                    <input
                        style={{ border: "none" }}
                        type="text"
                        className="w-100 list-group-item px-5 text-body-tertiary"
                        placeholder="What needs to be done?"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                if (inputValue.trim() === "") {
                                    return alert("No se puede agregar un valor vacio.");
                                }
                                setLista(lista.concat([inputValue.trim()]));
                                setInputValue("");
                            }
                        }}
                    />
                    {
                        lista.length === 0
                            ? <p
                                className="text-body-tertiary"
                            >There are no pending tasks. Add tasks.</p>
                            : lista.map((item, index) => {
                                return (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-5 text-body-tertiary">
                                        {item}
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() => {
                                                setLista(
                                                    lista.filter((l, eliminar) => index != eliminar)
                                                )
                                            }}
                                        >x</button>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
            <p className="d-flex align-items-start fs-6 text-body-tertiary">{lista.length} item left</p>
        </div >
    );
}