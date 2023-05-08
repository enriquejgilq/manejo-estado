import React from "react";
import { Loading } from "./Loading";

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false
        }
    }

    componentDidUpdate() {
        if (!!this.state.loading) {
            setTimeout(() => {
                this.setState({ loading: false })
            }, 3000);
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el codigo de seguridad</p>
                {this.state.error && <p>Error: el codigo es incorrecto</p>}
                {this.state.loading && <Loading />}

                <input placeholder="Codigo de seguridad"></input>
                <button onClick={() => this.setState({ loading: true })}>Comprobar</button>
            </div>
        )
    }

}
export { ClassState }