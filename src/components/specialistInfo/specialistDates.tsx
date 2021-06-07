import React, { useEffect, useRef, useState } from "react";

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
  IonButton,
} from "@ionic/react";

import { useDispatch, useSelector } from "react-redux";
import { specialistsSelector } from "../../redux/slices/specialists";

import { calendar, lockClosed } from "ionicons/icons";
import db from "../../firebaseConfig";
import {
  fetchInitialDateInfo,
  initialDateSelector,
} from "../../redux/slices/initialDate";

const SpecialistDates: React.FC = () => {
  const { specialists } = useSelector(specialistsSelector);
  const { initialDate } = useSelector(initialDateSelector);

  const [currentIndexOfDate, setCurrentIndexOfDate] = useState<any>(0);
  const [currentIndexOfTime, setCurrentIndexOfTime] = useState<any>(0);

  const datesSlides = useRef<any>(null);
  const timeSlides = useRef<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialDateInfo());
  }, [dispatch]);

  const getDateFromTimeStamp = (timestamp: any) => {
    const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
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

  const writeAppointmentData = () => {
    db.collection("appointment").doc("0bL75vcBwUcKGenQEhyv").set({
      currentIndexOfDate: currentIndexOfDate,
      currentIndexOfTime: currentIndexOfTime,
    });
  };

  const activeChange = async (target: any) => {
    const swiper = await datesSlides.current.getSwiper();
    console.log(initialDate.currentIndexOfDate);
    target.getActiveIndex().then((index: any) => {
      if (swiper.slides[index]) {
        swiper.slides[index].classList.add("date-slide-active");
        setCurrentIndexOfDate(index);
      }
    });
    target.getPreviousIndex().then((index: number) => {
      if (swiper.slides[index]) {
        swiper.slides[index].classList.remove("date-slide-active");
      }
    });
  };

  const timeChange = async (target: any) => {
    const swiper = await timeSlides.current.getSwiper();

    target.getActiveIndex().then((index: any) => {
      if (swiper.slides[index]) {
        swiper.slides[index].children[0].classList.add("time-slide-active");
        setCurrentIndexOfTime(index);
      }
    });
    target.getPreviousIndex().then((index: number) => {
      if (swiper.slides[index]) {
        swiper.slides[index].children[0].classList.remove("time-slide-active");
      }
    });
  };

  const navigateToInitialDate = async (target: any) => {
    target.slideTo(initialDate.currentIndexOfDate).then((index: number) => {});
    setCurrentIndexOfDate(initialDate.currentIndexOfDate);
  };

  const navigateToInitialTime = async (target: any) => {
    target.slideTo(initialDate.currentIndexOfTime).then((index: number) => {});
    setCurrentIndexOfTime(initialDate.currentIndexOfTime);
  };

  const slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    centeredSlides: true,
  };
  return (
    <IonCard>
      <IonCardHeader>
        <IonGrid>
          <IonRow className="possible-date">
            <IonCol className="possible-date-title">Возможная дата</IonCol>
            <IonCol className="possible-date-icons ion-text-right">
              <IonIcon className="possible-date-icon" icon={calendar}></IonIcon>
              <IonIcon className="possible-date-icon" icon={calendar}></IonIcon>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardHeader>
      <IonCardContent>
        <IonSlides
          className="date-slides"
          ref={datesSlides}
          options={slideOpts}
          onIonSlidesDidLoad={(event) => navigateToInitialDate(event.target)}
          onIonSlideDidChange={(event) => {
            activeChange(event.target);
          }}
        >
          {specialists.availableDates &&
            specialists.availableDates.map(function (item: any) {
              const date = getDateFromTimeStamp(item.date.seconds);

              return (
                <IonSlide className="date-slide " key={date.day}>
                  <p className="date-slide-weekday">{date.weekday}</p>
                  <p className="date-slide-monthday"> {date.day}</p>
                </IonSlide>
              );
            })}
        </IonSlides>

        <IonSlides
          className="time-slides"
          options={slideOpts}
          ref={timeSlides}
          onIonSlidesDidLoad={(event) => navigateToInitialTime(event.target)}
          onIonSlideDidChange={(event) => {
            timeChange(event.target);
          }}
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
            specialists.availableDates[currentIndexOfDate].times.map(function (
              item: string
            ) {
              return (
                <IonSlide className="time-slide" key={item}>
                  <IonItem className="time-slide-item">{item}</IonItem>
                </IonSlide>
              );
            })}
        </IonSlides>

        <IonCard className="appointment">
          <IonGrid>
            <IonRow>
              <IonCol className="appointment-data ion-text-center ">
                <p>Дата:</p>
                <p className="appointment-data-current">
                  {specialists.availableDates &&
                    getDateFromTimeStamp(
                      specialists.availableDates[currentIndexOfDate].date
                        .seconds
                    ).day}
                  {specialists.availableDates &&
                    getDateFromTimeStamp(
                      specialists.availableDates[currentIndexOfDate].date
                        .seconds
                    ).month}
                </p>
              </IonCol>
              <IonCol className="appointment-time ion-text-center">
                <p>Время:</p>
                <p className="appointment-time-current">
                  {specialists.availableDates &&
                    specialists.availableDates[currentIndexOfDate].times[
                      currentIndexOfTime
                    ]}
                </p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonButton
                expand="full"
                color="tertiary"
                className="appointment-button"
                onClick={() => writeAppointmentData()}
              >
                ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonCardContent>
    </IonCard>
  );
};

export default SpecialistDates;
