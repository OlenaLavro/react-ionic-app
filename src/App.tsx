import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { fetchSpecialistsInfo } from "./redux/slices/specialists";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Home from "./pages/Home";

import "@ionic/react/css/core.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./theme/variables.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

const App: React.FC = () => {
  const dispatch = useDispatch();

  // dispatch our thunk when component App first mounts
  useEffect(() => {
    dispatch(fetchSpecialistsInfo());
  }, [dispatch]);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Home></Home>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
