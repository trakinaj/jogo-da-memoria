import React from 'react'
import './Login.css'


class Login extends React.Component {

    handlePropsFunctions(e) {

        this.props.setNameFunction(e.target.value)
    }
    render() {

        return (
            <div id="div">
                <form id="form" onSubmit={(e) => this.props.handlePopUpFunction(e)}>
                    Informe seu nome:
                    <div>
                        <input type="input" id="input" onChange={(e) => this.handlePropsFunctions(e)} ></input>
                        <input type="submit" value="submit" id="submit"></input>

                    </div>
                </form>

            </div>

        )
    }

}

export default Login