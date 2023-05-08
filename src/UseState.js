import React, { useState } from "react";

function UseState({ name }) {
    const [error, setError] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor escribe el codigo de seguridad</p>
            {error && <p>Error: el codigo es incorrecto</p>}
            {loading && <p>Cargando...</p>}
            <input placeholder="Codigo de seguridad"></input>
            <button onClick={() => setLoading(true)}>Comprobar</button>
        </div>
    );
}
export { UseState };
