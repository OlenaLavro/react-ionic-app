import React from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonThumbnail,
  IonCardContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import { useSelector } from "react-redux";
import { specialistsSelector } from "../../redux/slices/specialists";

const SpecialistInfo: React.FC = () => {
  //getting data about specialist or error from our store
  const { specialists, loading, hasErrors } = useSelector(specialistsSelector);

  return (
    <IonCard className="profile-section">
      <IonCardHeader>
        <IonCardTitle className="profile-title">
          {specialists.name}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow className="ion-align-items-center h">
            <IonCol>
              <IonThumbnail className="profile-avatar-container">
                <IonImg
                  className="profile-avatar"
                  src={specialists && specialists.avatarSrc}
                />
              </IonThumbnail>
            </IonCol>
            <IonCol className="profile-duration">
              <p className="profile-duration-title">
                Длительность консультации
              </p>
              <p className="profile-duration-amount">
                {specialists.durationOfSession} минут
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default SpecialistInfo;
