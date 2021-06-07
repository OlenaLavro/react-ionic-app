import React, { useEffect, useRef, useState } from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardContent,
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

import { calendar } from "ionicons/icons";
import db from "../../firebaseConfig";
import {
  fetchInitialDateInfo,
  initialDateSelector,
} from "../../redux/slices/initialDate";

const SpecialistDates: React.FC = () => {
  //getting data or error
  const { specialists } = useSelector(specialistsSelector);
  const { initialDate } = useSelector(initialDateSelector);

  //defining states for current slide index
  const [currentIndexOfDate, setCurrentIndexOfDate] = useState<any>(0);
  const [currentIndexOfTime, setCurrentIndexOfTime] = useState<any>(0);

  //getting ref from our sliders
  const datesSlides = useRef<any>(null);
  const timeSlides = useRef<any>(null);

  //  dispatch our thunk when component  first mounts
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialDateInfo());
  }, [dispatch]);

  //function that convert timestamp to object with day, weekday and month properties
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

  //handler for button for making appointment that set data about appointment to Firestore
  const writeAppointmentData = () => {
    db.collection("appointment").doc("0bL75vcBwUcKGenQEhyv").set({
      currentIndexOfDate: currentIndexOfDate,
      currentIndexOfTime: currentIndexOfTime,
    });
  };

  //handle changing current slide in date slider
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

  //handle changing current slide in time slider
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

  //handler for setting initial active slide in date slider
  const navigateToInitialDate = async (target: any) => {
    target.slideTo(initialDate.currentIndexOfDate).then((index: number) => {});
    setCurrentIndexOfDate(initialDate.currentIndexOfDate);
  };

  //handler for setting initial active slide in time slider
  const navigateToInitialTime = async (target: any) => {
    target.slideTo(initialDate.currentIndexOfTime).then((index: number) => {});
    setCurrentIndexOfTime(initialDate.currentIndexOfTime);
  };

  //slider settings
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
          //emitted after slider initialization
          onIonSlidesDidLoad={(event) => navigateToInitialDate(event.target)}
          //emitted after the active slide has changed
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
            //changing the IonSlides key when the slides list changes
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
                    //get day from current index of date
                    getDateFromTimeStamp(
                      specialists.availableDates[currentIndexOfDate].date
                        .seconds
                    ).day}
                  {specialists.availableDates &&
                    //get month from current index of date
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
                    //get time from current index of time
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
                //emitted after the click on the button
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
