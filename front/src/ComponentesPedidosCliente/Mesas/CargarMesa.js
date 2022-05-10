import React, { useContext, createContext } from "react";
import WrapperConsumer, { ContextUsuario } from "../../componentesSesion/Context/ContextUsuario";

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    ModalBody,
    ModalFooter,
    Row,
    Card,
    CardHeader
} from "reactstrap";
import { AppSwitch } from "@coreui/react";


class CargarMesa extends React.Component {
    static contextType = createContext(ContextUsuario)

    constructor(props) {
        super(props);
        this.state = {
            mesa: props.mesa || {},
            mesas: props.mesas || [],
            responsable: props.responsable || {},
            responsables: props.responsables || [],

        };
    }

    estadoInicial = () => {
        this.setState({
            mesa: {
                cantidadPersonas: 0,
                // habilitada:"",
            },

        });
    };

    handleSubmit = (event) => {
        const id = this.state.mesa.id_mesa;
        // if (id) {
        //     console.log("onSubmit-id", id)
        //     this.editarMesa(id);
        // } else {
        this.crearMesa()
        // }
        event.preventDefault(event);
    };


    crearMesa = () => {
        fetch("http://localhost:8383/mesa/nueva", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.mesa),
        })
            .then(this.props.listadoMesas)
            .then(this.estadoInicial())
            .catch(err => console.log("error", err), this.estadoInicial())
    };
//     crearMesaConResponsable = (responsableId) => {
//         let rol = this.props.context.usuario.rol
//         let idResponsable = this.props.context.usuario.responsableId
//         if (rol == "RESPONSABLE") {
//             fetch(`http://localhost:8383/mesas/${idResponsable}`, {
//                 method: "post",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(this.state.mesa),
//             })
//                 .then(this.props.listadoMesas)
//                 .then(this.estadoInicial())
//                 .catch(err => console.log("error", err), this.estadoInicial())
//         }
//         else {
//             fetch(`http://localhost:8383/mesas/${responsableId}`, {
//                 method: "post",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(this.state.mesa),
//             })
//                 .then(this.props.listadoMesas)
//                 .then(this.estadoInicial())
//                 .catch(err => console.log("error", err), this.estadoInicial())
//         }

//     }
// };

editarMesa = (id) => {
    fetch("http://localhost:8383/mesa/" + id, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.mesa),
    })
        .then(this.props.listadoMesas)
        .then(this.estadoInicial())
        .catch(err => console.log("error", err), this.estadoInicial())
};

render() {
    // let mesas = this.state.mesas.filter(m => m.habilitada == true)
    // var listaMesas = mesas.map((m, index) => {
    return (
        <Col xs="12" md="12">
            <ModalBody>
                <Form className="form-horizontal">
                    {/* <FormGroup row>
                            <Col md="3">
                                <Label for="id_mesa">Nro&nbsp;id_mesa</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="number"
                                    id="id_mesa"
                                    name="id_mesa"
                                    placeholder="Completa id_mesa..."
                                    required={false}
                                    value={this.state.mesa.id_mesa}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label for="id_pedido">Nro&nbsp;id_pedido</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="number"
                                    id="id_pedido"
                                    name="id_pedido"
                                    placeholder="Completa id_pedido..."
                                    required={false}
                                    // value={34}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup> */}
                    <FormGroup row>
                        <Col md="3">
                            <Label for="responsableId">Nro&nbsp;responsableId</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input
                                type="number"
                                id="responsableId"
                                name="responsableId"
                                placeholder="Completa responsableId..."
                                required={false}
                                value={this.state.mesa.responsableId}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label for="cantidadPersonas">cantidad personas</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input
                                type="number"
                                id="cantidadPersonas"
                                name="cantidadPersonas"
                                required
                                value={this.state.mesa.cantidadPersonas}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <div className="card-header-actions">
                            <AppSwitch
                                type="checkbox"
                                className={"float-left mb-0"}
                                label
                                color={"info"}
                                size={"sm"}
                                name="habilitada"
                                checked={this.state.mesa.habilitada}
                                onChange={this.handleChange}
                            />
                        </div>
                    </FormGroup>

                    <Button
                        type="submit"
                        color="success"
                        outline
                        onClick={this.handleSubmit}
                    >
                        <i className="fa fa-dot-circle-o"></i> Guardar Mesa
                    </Button>
                </Form>
            </ModalBody>
            <ModalFooter></ModalFooter>
        </Col>

    );
    // });
    // console.log("listaMesas", listaMesas);
    // return (
    //     <div>hola mesa</div>
    // );
}

handleChange = (e) => {
    var nuevaMesa = Object.assign({}, this.state.mesa);
    // var nuevoResponsable = Object.assign({}, this.state.responsable);
    nuevaMesa[e.target.name] =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // nuevoResponsable[e.target.name] = e.target.value;
    this.setState({
        mesa: nuevaMesa, mesas: this.state.mesas,
        // responsable: nuevoResponsable, responsables: this.state.responsables,
    }, () => console.log("nueva mesa change", nuevaMesa, this.state.mesa));
};

}

export default WrapperConsumer(CargarMesa)
