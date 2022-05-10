import React, { useContext } from "react";
import { Button } from "reactstrap";

class MesasRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editar: false,
            toogle: this.props.toggle,
        };
        this.eliminarMesa = this.eliminarMesa.bind(this);
        this.seleccionarMesa = this.seleccionarMesa.bind(this);
    }

    eliminarMesa = (id) => {
        fetch("http://localhost:8383/mesa/" + id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(this.props.actualizarAlEliminar(this.props.mesa));
    };

    seleccionarMesa(unaMesa) {
        this.props.selector(unaMesa);
        console.log("seleccionar___", unaMesa);
        this.props.toggle();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.mesas !== this.props.mesas) {
            this.setState({ mesas: nextProps.mesas });
        }
        if (nextProps.mesa !== this.props.mesa) {
            this.setState({ mesa: nextProps.mesa });
        }
        if (nextProps.responsables !== this.props.responsables) {
            this.setState({ responsables: nextProps.responsables });
        }
        if (nextProps.responsable !== this.props.responsable) {
            this.setState({ responsable: nextProps.responsable });
        }
    }

    render = () => {
   
    
        return (
            <tr>
                <td>{this.props.mesa.id_mesa}</td>
                {/* <td>{this.props.pedido.id_pedido}</td> */}
                {/* <td>{this.props.mesa.responsableId}</td> */}
                <td>{this.props.mesa.cantidadPersonas}</td>
                <td>{this.props.mesa.habilitada == true ? "SI" : "NO"}</td> 
                <td>
                    <Button
                        color="danger"
                        size="btn-xs"
                        onClick={() => this.eliminarMesa(this.props.mesa.id_mesa)}>
                        <i className="cui-trash icons font-1xl d-block mt-1"></i>
                    </Button>{" "}
                    &nbsp;&nbsp;
                    <Button
                        color="info"
                        size="btn-xs"
                        onClick={() => this.seleccionarMesa(this.props.mesa)}>
                        <i className="fa fa-dot-circle-o">{""}</i>
                    </Button>
                </td>
            </tr>
        );
    };
}

export default MesasRow;
