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
import db from "../firebaseConfig";
import { star } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecialistsInfo,
  specialistsSelector,
} from "../redux/slices/specialists";
import ReactDOM from "react-dom";

const Home: React.FC = () => {
  const slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    centeredSlides: true,
  };
  const [currentIndexOfDate, setCurrentIndexOfDate] = useState<any>(0);
  const datesSlides = useRef<any>(null);
  const getDateFromTimeStamp = (timestamp: any) => {
    const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const today = new Date();
    const weekday = date.getDay();
    return {
      day: day,
      weekday: today.getDay() == weekday ? "Сегодня" : weekdays[weekday],
    };
  };

  const activeChange = async (target: any) => {
    const swiper = await datesSlides.current.getSwiper();

    target.getActiveIndex().then((index: any) => {
      console.log(swiper.slides[index]);
      if (swiper.slides[index]) {
        swiper.slides[index].style.background = "red";
        setCurrentIndexOfDate(index);
      }
    });
    target.getPreviousIndex().then((index: number) => {
      if (swiper.slides[index]) {
        swiper.slides[index].style.background = "white";
      }
    });
  };

  const dispatch = useDispatch();
  const { specialists, loading, hasErrors } = useSelector(specialistsSelector);
  // dispatch our thunk when component first mounts
  useEffect(() => {
    dispatch(fetchSpecialistsInfo());
  }, [dispatch]);

  return (
    <IonPage className="main">
      <IonContent>
        <IonCard className="bl">
          <IonCardHeader>
            <IonCardTitle className="profile-title">
              {specialists.name}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol>
                  <IonThumbnail>
                    <IonImg
                      className="profile-avatar"
                      src={specialists && specialists.avatarSrc}
                    />
                  </IonThumbnail>
                </IonCol>
                <IonCol>
                  <p>Длительность консультации</p>
                  <h2>{specialists.durationOfSession} минут</h2>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol>Возможная дата</IonCol>
                <IonCol className="ion-text-right">
                  <IonIcon icon={star}></IonIcon>
                  <IonIcon icon={star}></IonIcon>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardHeader>
          <IonCardContent>
            <IonSlides
              ref={datesSlides}
              options={slideOpts}
              onIonSlideDidChange={(event) => {
                activeChange(event.target);
              }}
            >
              {specialists.availableDates &&
                specialists.availableDates.map(function (item: any) {
                  const date = getDateFromTimeStamp(item.date.seconds);

                  return (
                    <IonSlide key={date.day}>
                      <IonGrid>
                        <IonCol>
                          <IonItem className="weekday">{date.weekday}</IonItem>
                          <IonItem className="day">{date.day}</IonItem>
                        </IonCol>
                      </IonGrid>
                    </IonSlide>
                  );
                })}
            </IonSlides>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonSlides
              options={slideOpts}
              key={
                //Changing the IonSlides key when the slides list changes
                specialists.availableDates &&
                specialists.availableDates[currentIndexOfDate].times
                  .map(function (item: any) {
                    return item;
                  })
                  .join("_")
              }
            >
              {specialists.availableDates &&
                specialists.availableDates[currentIndexOfDate].times.map(
                  function (item: string) {
                    return (
                      <IonSlide key={item}>
                        <IonItem className="time">{item}</IonItem>
                      </IonSlide>
                    );
                  }
                )}
            </IonSlides>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            Дата:
            {specialists.availableDates &&
              getDateFromTimeStamp(
                specialists.availableDates[currentIndexOfDate].date.seconds
              ).day}
            Время:
            {specialists.availableDates &&
              getDateFromTimeStamp(
                specialists.availableDates[currentIndexOfDate].date.seconds
              ).weekday}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
