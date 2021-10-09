import React from "react";
import { Route, Redirect,useLocation } from "react-router-dom";
import WrapperConsumer ,{ContextUsuario} from "./componentesSesion/Context/ContextUsuario";
// console.log("PRrrrrrrrrrrrrrrrrrrrrrr")

function PrivateRoutes ({usuario,auth,rol,component:Component,...rest}) {
  // console.log("PrivateRoutes!!!!!!!!!!",rol,usuario)
  // const location = useLocation();
//   return (
//     <Route {...rest}>
//       {context.auth === false ? (
//         <Component />
//       ) : (

//       <Redirect to={{ pathname: "/login" , state: { from: location }}} />
//       )}
//     </Route>
//   );
// }
  return (
    <Route
      {...rest}
      render={props => {
        // console.log("las props PRIVATE ROUTES" + {...rest},props.location)
        if (rol == "ADMIN") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from:props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
}

// export default WrapperConsumer(PrivateRoutes)
export default PrivateRoutes
