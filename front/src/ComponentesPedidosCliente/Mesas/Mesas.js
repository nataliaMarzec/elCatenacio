import React, { createContext } from "react";
import MesasRow from "./MesasRow";
import CargarMesa from "./CargarMesa";
import WrapperConsumer, { ContextUsuario } from "../../componentesSesion/Context/ContextUsuario";
import {
    Table,
    Container,
    Row,
    Button,
    Modal,
    ModalHeader,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
} from "reactstrap";

class Mesas extends React.Component {
    static contextType = createContext(ContextUsuario)

    constructor(props) {
        super(props);
        this.state = {
            mesa: {},
            mesas: [],
            seleccionado: {},
            responsable: {},
            responsables: [],
            usuario: {},
            usuarios: [],
            modal: false,
            editable: false,

        };
        this.listadoResponsables = this.listadoResponsables.bind(this)
        this.listadoUsuarios = this.listadoUsuarios.bind(this)
        this.listadoMesas = this.listadoMesas.bind(this)
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };


    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };

    componentDidMount() {
        this.listadoMesas();
        this.listadoResponsables();
        this.listadoUsuarios()
    }

    listadoMesas = () => {
        fetch(`http://localhost:8383/mesas`)
            .then((res) => res.json())
            .then(
                (res) => this.setState({ mesas: res, mesa: {} }),
                console.log("Usuarios", this.state.mesas)
            );
    }

    listadoUsuarios = () => {
        fetch(`http://localhost:8383/usuarios`)
            .then((res) => res.json())
            .then(
                (res) => this.props.context.setStateUsuarios(res),
                console.log("Usuarios", this.props.context.usuarios)
            );
    }

    listadoResponsables = () => {
        fetch(`http://localhost:8383/responsables`)
            .then((res) => res.json())
            .then(
                (res) => this.setState({ responsables: res, responsable: {} }),
                console.log("ResponsableEnviado", this.state.responsables)
            );
    };

    listadoUsuarios = () => {
        fetch(`http://localhost:8383/usuarios`)
            .then((res) => res.json())
            .then(
                (res) => this.setState({ usuarios: res }),
                console.log("Usuarios", this.props.context.usuarios, this.state.usuarios)
            )
    }


    actualizarAlEliminar = (unaMesa) => {
        var listadoMesas = this.state.mesas.filter(
            (item) => unaMesa !== item
        );

        this.setState({
            mesas: listadoMesas

        });
    };

    seleccionar = (unaMesa) => {
        this.setState({ mesa: unaMesa });
    };


    ModalHeaderStrong = (editable) => {
        if (editable) {
            return (
                <ModalHeader editable={"false"} toggle={this.toggle}>
                    <strong>Nueva</strong>Mesa
                </ModalHeader>
            );
        }
        return (
            <ModalHeader editable={true} toggle={this.toggle}>
                <strong>Modificar</strong>Mesa
            </ModalHeader>
        );
    };
    render(props) {
        return (
            <div className="container">
                <div></div>
                <Row>&nbsp;</Row>
                <Container fluid>
                    <Button color="success" onClick={this.toggle}>
                        Nueva Mesa
                    </Button>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        {/* <this.ModalHeaderStrong></this.ModalHeaderStrong> */}
                        <CargarMesa
                            listadoMesas={this.listadoMesas}
                            listadoResponsables={this.listadoResponsables}
                            listadoUsuarios={this.listadoUsuarios}
                            mesa={this.state.mesa}
                            mesas={this.state.mesas}
                            responsable={this.state.responsable}
                            responsables={this.state.responsables}
                            usuario={this.state.usuario}
                            usuarios={this.state.usuarios}
                        />
                    </Modal>
                    <Row>&nbsp;</Row>
                </Container>
                <div className="animated fadeIn">

                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Mesas Lista
                                </CardHeader>
                                <CardBody>
                                    <Table responsive bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>Id mesa</th>
                                                {/* <th>Nro pedido</th> */}
                                                {/* <th>Id responsable</th> */}
                                                <th>cantidad personas</th>
                                                <th>habilitada</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>{this.renderRows()}</tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    renderRows() {
        let mesas=this.state.mesas
        let responsables=this.state.responsables
        console.log("ROW mesas", this.state.mesas)
        return (
            <React.Fragment>{
                mesas.map((unaMesa, index) => {
                    var responsable = responsables.find(r => r.id_responsable == unaMesa.responsableId)

                    {/* if (responsable) {
                        let listaResponsables = responsables.filter(r => r.id_responsable == unaMesa.responsableId) */}
                        return (
                            <MesasRow
                                key={index}
                                index={index}
                                mesa={unaMesa}
                                mesas={mesas}
                                responsables={responsables}
                                responsable={responsable}
                                selector={this.seleccionar}
                                actualizarAlEliminar={this.actualizarAlEliminar}
                                toggle={this.toggle}
                            />
                        )
                })
                }
            </React.Fragment>
        )
    }

}

export default WrapperConsumer(Mesas)
