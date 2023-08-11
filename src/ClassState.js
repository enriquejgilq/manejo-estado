import React from "react";
import { Loading } from "./Loading";
const SECURITY_CODE = "paradigma"

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false
        }
    }

    componentDidUpdate() {
        if (!!this.state.loading) {
            setTimeout(() => {
                if (SECURITY_CODE === this.state.value) {
                    this.setState({ error: false, loading: false })
                } else {
                    this.setState({ error: true, loading: false })
                }
            }, 3000);
        }
    }

    render() {
        const { error, loading, value } = this.state
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el codigo de seguridad</p>
                {(error && !loading) && <p>Error: el codigo es incorrecto</p>}
                {loading && <Loading />}

                <input
                    placeholder="Codigo de seguridad"
                    value={value}
                    onChange={(event) => { this.setState({ value: event.target.value }) }}></input>
                <button onClick={() => this.setState({ loading: true })}>Comprobar</button>
            </div>
        )
    }

}
export { ClassState }