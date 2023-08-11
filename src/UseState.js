import React, { useState, useEffect } from "react";
const SECURITY_CODE = "paradigma";

function UseState({ name }) {
    const [state, setState] = useState({
        value: "",
        loading: false,
        error: false,
        deleted: false,
        confirm: false,
    });
    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirm: true,
        });
    };
    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        });
    };
    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    };
    const onCheck = () => {
        setState({
            ...state,
            error: false,
            loading: true,
        });
    };

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    };
    const onReset = () => {
        setState({
            ...state,
            confirm: false,
            deleted: false,
            value: "",
        });
    };

    useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
            }, 2000);
        }
    }, [state.loading]);
    if (!state.deleted && !state.confirm) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor escribe el codigo de seguridad</p>
                {state.error && !state.loading && <p>Error: el codigo es incorrecto</p>}
                {state.loading && <p>Cargando...</p>}
                <input
                    placeholder="Codigo de seguridad"
                    value={state.value}
                    onChange={(event) => {
                        onWrite(event.target.value);
                    }}
                ></input>
                <button
                    onClick={() => {
                        onCheck();
                    }}
                >
                    Comprobar
                </button>
            </div>
        );
    } else if (!!state.confirm && !state.deleted) {
        return (
            <>
                <p>Confimación, estas seguro? </p>
                <button onClick={() => onDelete()}> Si, eliminar</button>
                <button onClick={() => onReset()}>No, volver</button>
            </>
        );
    } else {
        return (
            <>
                <button onClick={() => onReset()}> Reset volver atras</button>
            </>
        );
    }
}
export { UseState };
