import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecialistsInfo,
  specialistsSelector,
} from "../redux/slices/specialists";
import SpecialistInfo from "../components/specialistInfo/specialistInfo";
import SpecialistDates from "../components/specialistInfo/specialistDates";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { specialists, loading, hasErrors } = useSelector(specialistsSelector);
  // dispatch our thunk when component first mounts
  useEffect(() => {
    dispatch(fetchSpecialistsInfo());
  }, [dispatch]);

  return (
    <IonPage className="main ">
      <IonContent>
        <SpecialistInfo />
        <SpecialistDates />
      </IonContent>
    </IonPage>
  );
};

export default Home;
