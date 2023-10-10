import React, { useEffect, useReducer } from "react";
const SECURITY_CODE = "paradigma";

const initialState = {
    value: 'paradigma',
    loading: false,
    error: false,
    deleted: false,
    confirmed: false,
}
const actionTypes = {
    error: 'ERROR',
    confirm: 'CONFIRM',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
}


function UseReducer({ name }) {

    const reducerObjects = (state, payload) => ({
        [actionTypes.error]: {
            ...state,
            error: true,
            loading: false
        },
        [actionTypes.confirm]: {
            ...state,
            error: false,
            loading: false,
            confirm: true,
        },
        [actionTypes.write]: {
            ...state,
            value: payload,
        },
        [actionTypes.check]: {
            ...state,
            error: false,
            loading: true,
        },
        [actionTypes.delete]: {
            ...state,
            deleted: true,
        },
        [actionTypes.reset]: {
            ...state,
            confirm: false,
            deleted: false,
            value: "",
        }


    })
    const reducer = (state, action) => {
        if (reducerObjects(state)[action.type]) {
            return reducerObjects(state, action.payload)[action.type]
        } else {
            return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const onConfirmed = () => { dispatch({ type: actionTypes.confirm }) };
    const onError = () => { dispatch({ type: actionTypes.error }) };
    const onWrite = ({ target: { value } }) => { dispatch({ type: actionTypes.write, payload: value }) };
    const onCheck = () => { dispatch({ type: actionTypes.check }) };
    const onDelete = () => { dispatch({ type: actionTypes.delete }) };
    const onReset = () => { dispatch({ type: actionTypes.reset }) };

    useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirmed()
                } else {
                    onError()
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
                    onChange={onWrite}
                ></input>
                <button
                    onClick={onCheck}
                >
                    Comprobar
                </button>
            </div>
        );
    } else if (!!state.confirm && !state.deleted) {
        return (
            <>
                <p>Confimación, estas seguro? </p>
                <button onClick={onDelete}> Si, eliminar</button>
                <button onClick={onReset}>No, volver</button>
            </>
        );
    } else {
        return (
            <>
                <button onClick={() => dispatch({
                    type: 'RESET',
                })}> Reset volver atras</button>
            </>
        );
    }
}
export { UseReducer };
