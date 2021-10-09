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
                auth:false,
                LoggedIn: false,
                error: ""
            },
            rol:""
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
    setStateUsuarios = (usuarios) => {
        // console.log("Usuarios",usuarios)
        this.setState({usuarios:usuarios})
    }

    onChangeRegistrar = (e) => {
        var nuevoUsuario = Object.assign({}, this.state.usuario);
        nuevoUsuario.rol = "CLIENTE"
        nuevoUsuario[e.target.name] = e.target.value;
        this.setState({ usuario: nuevoUsuario }
            // , () => console.log("signup", this.state.usuario)
            );
    }
    onChangeRegistrarResponsable=(e)=>{
        var nuevoUsuario = Object.assign({}, this.state.usuario);
        nuevoUsuario.rol = "RESPONSABLE"
        nuevoUsuario[e.target.name] = e.target.value;
        this.setState({ usuario: nuevoUsuario }, () => console.log("signupResp", this.state.usuario.rol));
    }

    onChangeLogin = (e) => {
        var nuevoUsuario = Object.assign({}, this.state.usuario);
        nuevoUsuario[e.target.name] = e.target.value;
        this.setState({ usuario: nuevoUsuario },
            //  () => console.log("signin")
             );
    }

    logueado = (auth) => {
        // console.log("auth", auth)
        this.setState({ auth: auth })
    }

    state = {
        usuarios: [],
        usuario: {},
        LoggedIn: false,
        error: '',
        auth: false,
        rol: '',
        estadoInicial: this.estadoInicial,
        setStateUsuarios:this.setStateUsuarios,
        setStateUsuario: this.setStateUsuario,
        setStateAuth: this.setStateAuth,
        setStateRol: this.setStateRol,
        onChangeLogin: this.onChangeLogin,
        onChangeRegistrar: this.onChangeRegistrar,
        onChangeRegistrarResponsable:this.onChangeRegistrarResponsable,
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

