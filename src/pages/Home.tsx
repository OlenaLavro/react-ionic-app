import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonThumbnail,
  IonCardContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonSlides,
  IonSlide,
  IonIcon,
  IonItem,
} from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import { star } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecialistsInfo,
  specialistsSelector,
} from "../redux/slices/specialists";
import SpecialistInfo from "../components/specialistInfo/specialistInfo";
import SpecialistDates from "../components/specialistInfo/specialistDates";

const Home: React.FC = () => {
  const getDateFromTimeStamp = (timestamp: any) => {
    const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const weekday = date.getDay();
    const today = new Date();
    return {
      day: day,
      weekday: today.getDay() == weekday ? "Сегодня" : weekdays[weekday],
      month: months[month],
    };
  };

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
