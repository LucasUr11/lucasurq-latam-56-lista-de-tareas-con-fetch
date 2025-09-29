import React, { useEffect, useState } from "react";

export function ListaTarea() {

    const [inputValue, setInputValue] = useState(""); // Estado para obtener el valor del input.-
    const [tareas, setTareas] = useState([]); // Estado para trabajar con las tareas.-

    const obtenerData = async () => {
        try {
            const resGET = await fetch('https://playground.4geeks.com/todo/users/lucas01'); // pido la tarea (data) a la API.-
            if (!resGET.ok) { // Confirmo que el resolve no tiene problemas.-
                throw new Error("Se ha detectado un error.");
            }
            const dataGET = await resGET.json(); // Convierto la resolve a un JSON().-
            setTareas(dataGET.todos); // Cambio el estado con la tarea que devolvio el JSON().-
        } catch (error) {
            console.error(error);
        }
    }

    const crearData = async (tarea) => {
        try {
            const resPOST = await fetch(`https://playground.4geeks.com/todo/todos/lucas01`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Declaro que el formato de los datos del body son tipo JSON()
                },
                body: JSON.stringify({ // Los datos de la tarea creada.-
                    "label": tarea,
                    "is_done": false
                })
            });
            if (!resPOST.ok) {
                throw new Error("Se ha detectado un error.");
            }
            const dataPOST = await resPOST.json();
            setTareas([...tareas, dataPOST]); // asignamos tareas existentes y agregamos la nueva.-

        } catch (error) {
            console.error('Algo ha salido mal');
        }
    }

    const eliminarData = async (id) => {
        try {
            const resDELETE = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json' // Declaro que el formato de los datos son en tipo JSON().-
                },
            });
            if (!resDELETE.ok) {
                throw new Error("Se ha detectado un error.");
            }
            const elementoEliminado = tareas.filter((tarea) => { // Filtro la tarea que no coincidan con su id para eliminarlo.-
                return tarea.id != id;
            })
            setTareas([...elementoEliminado]);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { // Sincronizo la obtencion de datos para mostrarlos.-
        obtenerData();
    }, []);

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
                                crearData(inputValue)
                                setInputValue("");
                            }
                        }}
                    />
                    {
                        tareas.length === 0
                            ? <p
                                className="text-body-tertiary"
                            >There are no pending tasks. Add tasks.</p>
                            : tareas.map((tarea, index) => {
                                return (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-5 text-body-tertiary">
                                        {tarea.label}
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() => {
                                                eliminarData(tarea.id)
                                            }}
                                        >x</button>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
            <p className="d-flex align-items-start fs-6 text-body-tertiary">{tareas.length} item left</p>
        </div >
    );
}