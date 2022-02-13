import { calendarFormat } from "moment";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  CardFooter,
  Col,
  Container,
  Label,
  Row,
  
} from "reactstrap";
import logo from "../../assets/img/brand/logo.svg";

// const CardContainer = styled.div`
//   position: relative;
//   flex: 0 0 9%;
//   display: flex;
//   justify-content: space-around;
//   margin: 1.55vw 1vw;
//   border-radius: 10px 10px 0 0;
//   transition: transform;
//   transition-duration: 0.25s;
//   color: white;
//   :hover {
//     cursor: pointer;
//     transform: scale(1.08);
//   }
//   @media screen and (max-width: 3000px) {
//     flex: 0 0 10%;
//   }
//   @media screen and (max-width: 2000px) {
//     flex: 0 0 13%;
//   }
//   @media screen and (max-width: 1440px) {
//     flex: 1 0 15%;
//   }
//   @media screen and (max-width: 1025px) {
//     flex: 1 0 25%;
//   }
//   @media screen and (max-width: 640px) {
//     flex: 1 0 25%;
//   }
//   @media screen and (max-width: 361px) {
//     flex: 1 0 33%;
//   }
// `;

class VistaDeProductosParaClientesRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: props.toggle,
      producto: props.producto,
      modal: false,
      selector:props.selector
    };
    this.eliminarProducto = this.eliminarProducto.bind(this);
    this.elegirProducto = this.elegirProducto.bind(this);
  }




  eliminarProducto = (id) => {
    fetch("http://localhost:8383/productos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.props.actualizarAlEliminar(this.props.producto));
  };



  comprar() { }

  // handleMovieClick() {
  //   dispatch({ type: "MOVIE_CLICKED", payload: props.movie });
  //   navigate(`/fullmoviepage/`, { myMovie: props.movie });
  // }

  //   const imageURL = `https://image.tmdb.org/t/p/w780${poster_path}`;

  //   const StyledRuntime = styled.div`
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   margin: 0.25rem;
  //   padding: 0.3rem;
  //   border-radius: 10%;
  //   background-color: rgba(0, 0, 0, 0.808);
  // // `;

  //   {/* <StyledImg
  //         src={poster_path ? imageURL : AltPoster}
  //         onClick={handleMovieClick}
  //         alt={`${title} poster`}
  //       />
  //       {showRuntime()}
  //       {showRating()}
  //       {props.removeMode && <RemoveFavoriteButton movie={props.movie} />} */}

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
      console.log(
        "productos props",
        this.props.productos,
        nextProps.productos.values()
      );
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
  }

  elegirProducto() {
    this.props.selector(this.props.producto);
    console.log("seleccionar___", this.props.producto);
    this.props.toggle();
  }

  render = () => {
    return (
      <div>
       
        <Card className="border-warning" style={{ color: "info" }} onClick={this.elegirProducto}>
          <CardImg top src={'http://localhost:8383/'+'Uploads/b202aba7-69cb-4f2b-b3cb-fddf229b2148.png'}
 style={{ border: "1px solid red" }} />
          <CardTitle><b className="ml-2">{this.props.producto.id} / {this.props.producto.descripcion}</b>
          </CardTitle>
          <Label className="ml-1"></Label>
          <Label className="ml-1"><b>${this.props.producto.precioUnitario}</b></Label>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>

    );
  };
}

export default VistaDeProductosParaClientesRow;
