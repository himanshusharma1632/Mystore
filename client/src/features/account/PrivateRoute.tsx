import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../app/REDUX/configureStore";

interface Props extends RouteProps {
component : ComponentType<any> | ComponentType<RouteComponentProps<any>>
}

export default function PrivateRoute({component : Component, ...rest} : Props) {
const {user} = useAppSelector(state => state.account);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/account/Login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
