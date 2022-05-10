import React, { Component } from "react";
import WrapperConsumer from "./componentesSesion/Context/ContextUsuario";
import PrivateRoutes from "./PrivateRoutes";
const Cards = React.lazy(() => import("./views/Base/Cards"));
const Dropdowns = React.lazy(() => import("./views/Base/Dropdowns"));
const Forms = React.lazy(() => import("./views/Base/Forms"));
const Jumbotrons = React.lazy(() => import("./views/Base/Jumbotrons"));
const ListGroups = React.lazy(() => import("./views/Base/ListGroups"));
const Navbars = React.lazy(() => import("./views/Base/Navbars"));
const Navs = React.lazy(() => import("./views/Base/Navs"));
const Switches = React.lazy(() => import("./views/Base/Switches"));
const BrandButtons = React.lazy(() => import("./views/Buttons/BrandButtons"));
const ButtonDropdowns = React.lazy(() =>
  import("./views/Buttons/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() => import("./views/Buttons/ButtonGroups"));
const Buttons = React.lazy(() => import("./views/Buttons/Buttons"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const CoreUIIcons = React.lazy(() => import("./views/Icons/CoreUIIcons"));
const SimpleLineIcons = React.lazy(() =>
  import("./views/Icons/SimpleLineIcons")
);
const Widgets = React.lazy(() => import("./views/Widgets/Widget03.js"));
const Alerts = React.lazy(() => import("./views/Notifications/Alerts"));
const Badges = React.lazy(() => import("./views/Notifications/Badges"));
const Modals = React.lazy(() => import("./views/Notifications/Modals"));
const Colors = React.lazy(() => import("./views/Theme/Colors"));
const PrincipalPage = React.lazy(() =>
  import("./PrincipalPage.js")
);


const Pedidos = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Pedidos")
);

const PedidoItems = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/PedidoItems")
);
const PedidoItemsDos = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/PedidoItemsDos")
);
const CargarPedido = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/CargarPedido")
);
const CargarUnPedido = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/CargarUnPedido")
);
const UnPedido = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/UnPedido")
);
const UnPedidoRow = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/UnPedidoRow")
);
const TablaPedido = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/TablaPedido")
);
const TablaPedidoRow = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/TablaPedidoRow")
);

const PedidoItemsEditar = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/EditarRows/PedidoItemsEditar")
);
const PedidoItemsDosEditar = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/EditarRows/PedidoItemsDosEditar")
);
const TablaPedidoEditarRow = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/EditarRows/TablaPedidoEditarRow")
);
const VistaPreviaPedido = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/VistaPreviaPedido")
);

const PedidosLista = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/PedidosLista")
);
const PedidosListaRow = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/PedidosListaRow")
);

const CocinaDetalles = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Cocina/CocinaDetalles")
);
const CocinaDetallesController = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Cocina/CocinaDetallesController")
);
const CocinaDetallesRow = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Cocina/CocinaDetallesRow")
);
const VistaDePedidosParaCocinaRow = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Cocina/VistaDePedidosParaCocinaRow")
);

const Responsables = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Responsables/Responsables"));
const ResponsableRow = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Responsables/ResponsableRow"))
const CargarResponsable = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Responsables/CargarResponsable"));

const PedidoDeResponsable = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Responsables/PedidoDeResponsable"));
const PedidoDeResponsableRow = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Responsables/PedidoDeResponsableRow"))
const CargarPedidoDeResponsable = React.lazy(() =>
  import("./ComponentesPedidosCliente/Pedidos/Responsables/CargarPedidoDeResponsable"));

const Clientes = React.lazy(() =>
  import("./ComponentesClientes/Clientes/Clientes")
);
const Cliente = React.lazy(() =>
  import("./ComponentesClientes/Clientes/Cliente")
);
const CargarCliente = React.lazy(() =>
  import("./ComponentesClientes/Clientes/CargarCliente")
);

const VistaDeProductosParaClientes = React.lazy(() =>
  import("./ComponentesPedidosCliente/Productos/VistaDeProductosParaClientes")
);
const VistaDeProductosParaClientesCard = React.lazy(() =>
  import(
    "./ComponentesPedidosCliente/Productos/VistaDeProductosParaClientesCard"
  )
);
const Productos = React.lazy(() =>
  import("./ComponentesPedidosCliente/Productos/Productos")
);
const CargarProducto = React.lazy(() =>
  import("./ComponentesPedidosCliente/Productos/CargarProducto")
);
const Producto = React.lazy(() =>
  import("./ComponentesPedidosCliente/Productos/Producto")
);

const Pago = React.lazy(() => import("./ComponentesPedidosCliente/Ventas/Pago"));

const VentasLista = React.lazy(() =>
  import("./ComponentesPedidosCliente/Ventas/VentasLista.js")
);
const Venta = React.lazy(() => import("./ComponentesPedidosCliente/Ventas/Venta"));
const CargarVenta = React.lazy(() =>
  import("./ComponentesPedidosCliente/Ventas/CargarVenta")
);
const VentasAUnCliente = React.lazy(() =>
  import("./ComponentesPedidosCliente/Ventas/VentasAUnCliente")
);

const Mesas = React.lazy(() =>
  import("./ComponentesPedidosCliente/Mesas/Mesas")
);
const CargarMesa = React.lazy(() =>
  import("./ComponentesPedidosCliente/Mesas/CargarMesa")
);
const Mesa = React.lazy(() =>
  import("./ComponentesPedidosCliente/Mesas/Mesas")
);

// const CajaDelDia = React.lazy(() =>
//   import("./ComponentesPedidosCliente/Caja/CajaDelDia")
// );
// const CajaMensual = React.lazy(() =>
//   import("./ComponentesPedidosCliente/Caja/CajaMensual")
// );
// const CargarCajaMensual = React.lazy(() =>
//   import("./ComponentesPedidosCliente/Caja/CargarCajaMensual")
// );
// const CajaMensualRow = React.lazy(() =>
//   import("./ComponentesPedidosCliente/Caja/CajaMensualRow")
// );


const Chat = React.lazy(() =>
  import("./Socket/Chat"))
const Home = React.lazy(() =>
  import("./componentesSesion/LoginYSesionDeUsuarios/Home")
);
//este
const Login = React.lazy(() =>
  import("./componentesSesion/LoginYSesionDeUsuarios/Login")
);
const Register = React.lazy(() =>
  import("./componentesSesion/LoginYSesionDeUsuarios/Register.js")
);

const Logout = React.lazy(() =>
  import("./componentesSesion/LoginYSesionDeUsuarios/Logout")
);

const ContextUsuario = React.lazy(() =>
  import("./componentesSesion/Context/ContextUsuario")
);


const routes = [
  // { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", exact: true, name: "Theme", component: Colors },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/views/widgets", name: "Widgets", component: Widgets },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/buttons", exact: true, name: "Buttons", component: Buttons },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Button Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  {
    path: "/icons/simple-line-icons",
    name: "Simple Line Icons",
    component: SimpleLineIcons,
  },
  {
    path: "/notifications",
    exact: true,
    name: "Notifications",
    component: Alerts,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  {
    path: "/chat",
    exact: true,
    key: "#chat",
    name: "Chat",
    component: Chat,
  },

  {
    path: "/principalPage",
    exact: true,
    key: "#principalPage",
    name: "PrincipalPage",
    component: PrincipalPage,
  },
  { path: "/home", exact: true, key: "#home", name: "Home", component: Home },
  {
    path: "/login",
    exact: true,
    key: "#login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    exact: true,
    key: "#register",
    name: "Register",
    component: Register,
  },

  {
    path: "/salir",
    exact: true,
    key: "#logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/contextUsuario",
    exact: true,
    key: "#contextUsuario",
    name: "ContextUsuario",
    component: ContextUsuario,
  },
  {
    path: "/wrapperConsumer",
    exact: true,
    key: "#wrapperConsumer",
    name: "WrapperConsumer",
    component: WrapperConsumer,
  },
  {
    path: "/privateRoutes",
    exact: true,
    key: "#privateRoutes",
    name: "PrivateRoutes",
    component: PrivateRoutes,
  },



  {
    path: "/pedidos",
    exact: true,
    key: "#pedidos",
    name: "Cargar pedidos",
    component: Pedidos,
    permisoAdmin: true,
    permisoResponsable: true
  },
  {
    path: "/pedidoItems",
    exact: false,
    key: "#pedidoItems",
    name: "PedidoItems",
    component: PedidoItems,
    permisoAdmin: true,
    permisoResponsable: false

  },
  {
    path: "/pedidoItemsDos",
    exact: false,
    key: "#pedidoItemsDos",
    name: "PedidoItemsDos",
    component: PedidoItemsDos,
    permisoAdmin: true,
    permisoResponsable: false

  },
  {
    path: "/cargarPedidos",
    exact: false,
    name: "ModificarPedido",
    component: CargarPedido,
    permisoAdmin: true,
    permisoResponsable: true
  },
  {
    path: "/unPedido",
    exact: true,
    name: "Un Pedido",
    component: UnPedido,
  },
  {
    path: "/unPedidoRow",
    exact: false,
    name: "UnPedidoRow",
    component: UnPedidoRow,
  },
  {
    path: "/cargarUnPedido",
    exact: false,
    name: "CargarUnPedido",
    component: CargarUnPedido,
    permisoAdmin: true,
    permisoResponsable: false
  },
  { path: "./tablaPedido", exact: false, name: "TablaPedido", component: TablaPedido },
  { path: "./tablaPedidoRow", exact: false, name: "TablaPedidoRow", component: TablaPedidoRow },
  {
    path: "/pedidoItemsEditar",
    exact: false,
    key: "#pedidoItemsEditar",
    name: "PedidoItemsEditar",
    component: PedidoItemsEditar,
    permisoAdmin: true,
    permisoResponsable: false
  },
  {
    path: "/pedidoItemsDosEditar",
    exact: false,
    key: "#pedidoItemsDosEditar",
    name: "PedidoItemsDosEditar",
    component: PedidoItemsDosEditar,
  },
  { path: "./tablaPedidoEditarRow", exact: false, name: "TablaPedidoEditarRow", component: TablaPedidoEditarRow },
  {
    path: "/vistaPreviaPedido",
    exact: false,
    key: "#vistaPreviaPedido",
    name: "VistaPreviaPedido",
    component: VistaPreviaPedido,
    permisoAdmin: true,
    permisoResponsable: false

  },
  {
    path: "/pedidosLista",
    exact: true,
    key: "#pedidosLista",
    name: "Pedidos",
    component: PedidosLista,
    permisoAdmin: true,
    permisoResponsable: false

  },
  {
    path: "/pedidosListaRow",
    exact: false,
    key: "#pedidosListaRow",
    name: "PedidosListaRow",
    component: PedidosListaRow,
    permisoAdmin: true,
    permisoResponsable: false,

  },
  {
    path: "/cocinaDetalles",
    exact: true,
    key: "#cocinaDetalles",
    name: "Cocina",
    component: CocinaDetalles,
    permisoAdmin: true,
    permisoResponsable: true,

  },
  {
    path: "/cocinaDetallesController",
    exact: false,
    key: "#cocinaDetallesController",
    name: "CocinaDetallesController",
    component: CocinaDetallesController,
    permisoAdmin: true,
    permisoResponsable: true,

  },
  {
    path: "/cocinaDetallesRow",
    exact: false,
    key: "#cocinaDetallesRow",
    name: "CocinaDetallesRow",
    component: CocinaDetallesRow,
    permisoAdmin: true,
    permisoResponsable: true

  },
  {
    path: "/vistaDePedidosParaCocinaRow",
    exact: false,
    key: "#vistaDePedidosParaCocinaRow",
    name: "VistaDePedidosParaCocinaRow",
    component: VistaDePedidosParaCocinaRow,
    permisoAdmin: true,
    permisoResponsable: false

  },
  {
    path: "/responsables",
    exact: true,
    key: "#responsables",
    name: "RegistrarResponsable",
    component: Responsables,
    permisoAdmin: true,
    permisoResponsable: true,
  },
  { path: "/responsableRow", name: "ResponsableRow", component: ResponsableRow },
  {
    path: "/cargarResponsable",
    name: "CargarResponsable",
    component: CargarResponsable,
    permisoAdmin: true,
    permisoResponsable: true,
  },

  {
    path: "/pedidoDeResponsable",
    exact: true,
    key: "#pedidoDeResponsable",
    name: "Pedido de responsable",
    component: PedidoDeResponsable,
    permisoAdmin: true,
    permisoResponsable: true,
  },
  { path: "/pedidoDeResponsableRow", name: "PedidoDeResponsableRow", component: PedidoDeResponsableRow },
  {
    path: "/cargarPedidoDeResponsable",
    name: "CargarPedidoDeResponsable",
    component: CargarPedidoDeResponsable,
    permisoAdmin: true,
    permisoResponsable: true,
  },
  {
    path: "/clientes",
    exact: true,
    key: "#clientes",
    name: "Clientes",
    component: Clientes,
    permisoAdmin: true,
    permisoResponsable: false,

  },
  { path: "/cliente", exact: true, name: "Cliente", component: Cliente },
  {
    path: "/cargarCliente",
    exact: true,
    name: "CargarCliente",
    component: CargarCliente,
  },

  {
    path: "/vistaDeProductosParaClientes",
    exact: true,
    key: "productos-cliente",
    name: "Productos-cliente",
    component: VistaDeProductosParaClientes,
    permisoAdmin: true,
    permisoResponsable: false

  },
  {
    path: "/vistaDeProductosParaClientesCard",
    exact: false,
    name: "ProductosClientes",
    component: VistaDeProductosParaClientesCard,
    permisoAdmin: true,
    permisoResponsable: false

  },
  {
    path: "/productos",
    exact: true,
    key: "#productos",
    name: "Productos",
    component: Productos,
    permisoAdmin: true,
    permisoResponsable: false

  },
  {
    path: "/cargarProducto",
    exact: false,
    name: "CargarProducto",
    component: CargarProducto,
    permisoAdmin: true,
    permisoResponsable: false

  },
  { path: "./producto", exact: false, name: "Producto", component: Producto },

  { path: "/pago", exact: true, name: "Pago", component: Pago },

  {
    path: "/ventas",
    exact: true,
    key: "#ventas",
    name: "VentasLista",
    component: VentasLista,
    permisoAdmin: true,
    permisoResponsable: false,

  },
  { path: "/venta", exact: true, name: "Venta", component: Venta },
  {
    path: "/cargarVenta",
    exact: true,
    name: "CargarVenta",
    component: CargarVenta,
  },
  {
    path: "/ventasAUnCliente",
    exact: true,
    key: "#ventasAUnCliente",
    name: "VentasAUnCliente",
    component: VentasAUnCliente,
  },
  {
    path: "/mesas",
    exact: true,
    key: "#mesas",
    name: "Mesas",
    component: Mesas,
    permisoAdmin: true,
    permisoResponsable: true

  },
  {
    path: "/cargarMesa",
    exact: false,
    name: "CargarMesa",
    component: CargarMesa,
    permisoAdmin: true,
    permisoResponsable: true

  },
  { path: "./mesa", exact: false, name: "Mesa", component: Mesa },


];

export default routes;
