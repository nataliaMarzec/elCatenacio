import React ,{createContext} from "react";

import WrapperConsumer,{ContextUsuario} from "../../../componentesSesion/Context/ContextUsuario";
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

class MesasElegidas extends React.Component {
    static contextType = createContext(ContextUsuario)

    constructor(props) {
        super(props);
        this.state = {
            seleccionado: {},
         
            botones: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            data:{},
            text:0,
        };
    }
    estadoInicial(){
        this.setState({
            data:this.state.data,
            text:0,
        })
    }

    render(props) {
     
        return (
            <div className="container">
               
                    <Button color="success" >
                        Nuevo responsable
                    </Button>
                    
                               
                          
             
            </div>
        );
    }

 
}

export default WrapperConsumer(MesasElegidas)
