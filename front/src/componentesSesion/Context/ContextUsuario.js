import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext()

class ContextUsuario extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log(this.props.children)
    }
    estadoInicial = () => {
        this.setState({
            usuario: {
                nombre: "",
                direccion: "",
                telefono: "",
                username: "",
                email: "",
                password: "",
                rol: "",
                auth: false,
                LoggedIn: false,
                error: "",
                usernameOrEmail: ""
            },
            rol: ""
        });
    }

    setStateUsuario = (usuario) => {
        console.log("SETUSUARIO", usuario)
        this.setState({ usuario: usuario })
    }

    setStateAuth = (auth) => {
        this.setState({ auth: auth })
    }
    setStateRol = (rol) => {
        console.log("SETROL", rol)
        this.setState({ rol: rol })
    }
    setStateUsernameOrEmail = (usernameOrEmail) => {
        console.log("SETUsernameOrEmail", usernameOrEmail)
        this.setState({ usernameOrEmail: usernameOrEmail })
    }
    setStateUsuarios = (usuarios) => {
        // console.log("Usuarios",usuarios)
        this.setState({ usuarios: usuarios })
    }
    setStateVerPassword = () => {
        this.setState({ verPassword: !this.state.verPassword })
    }

    onChangeRegistrar = (e) => {
        var nuevoUsuario = Object.assign({}, this.state.usuario);
        // nuevoUsuario.rol = "ADMIN"
        nuevoUsuario[e.target.name] = e.target.value;
        this.setState({ usuario: nuevoUsuario }
            , () => console.log("signupCliente", this.state.usuario)
        );

    }
    onChangeRegistrarResponsable = (e) => {
        var nuevoUsuario = Object.assign({}, this.state.usuario);
        nuevoUsuario.rol = "RESPONSABLE"
        nuevoUsuario[e.target.name] = e.target.value;
        this.setState({ usuario: nuevoUsuario }, () => console.log("signupResp", this.state.usuario.rol));
    }

    onChangeLogin = (e) => {
        var nuevoUsuario = Object.assign({}, this.state.usuario);
        nuevoUsuario[e.target.name] = e.target.value;
        this.setState({ usuario: nuevoUsuario },
            () => console.log("signin++++", nuevoUsuario)
        );
    }
    onChangeLoginUsernameOrEmail = (e) => {
    //     var nuevoUsuario = Object.assign({}, this.state.usernameOrEmail);
    //     nuevoUsuario[e.target.name] = e.target.value;
    //     this.setState({ usernameOrEmail: usernameOrEmail },
    //         () => console.log("signin++++", nuevoUsuario.usernameOrEmail)
    //     );
    }

    logueado = (auth) => {
        // console.log("auth", auth)
        this.setState({ auth: auth })
    }

    state = {
        usuarios: [],
        usuario: { usernameOrEmail: '' },
        LoggedIn: false,
        error: '',
        auth: false,
        rol: '',
        verPassword: false,
        usernameOrEmail: '',
        estadoInicial: this.estadoInicial,
        setStateUsuarios: this.setStateUsuarios,
        setStateUsuario: this.setStateUsuario,
        setStateAuth: this.setStateAuth,
        setStateRol: this.setStateRol,
        setStateUsernameOrEmail: this.setStateUsernameOrEmail,
        onChangeLogin: this.onChangeLogin,
        onChangeLoginUsernameOrEmail: this.onChangeLoginUsernameOrEmail,
        onChangeRegistrar: this.onChangeRegistrar,
        onChangeRegistrarResponsable: this.onChangeRegistrarResponsable,
        logueado: this.logueado,
    }

    // {/* {this.props.comp} */}
    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        )
    }
}

const WrapperConsumer = (Component) => {
    return (props) => {
        return (
            <Consumer>
                {context => <Component {...props} context={context} />}
            </Consumer>
        );
    };
}

export default WrapperConsumer;
export { ContextUsuario }

