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
              <h2 className="profile-duration-amount">
                {specialists.durationOfSession} минут
              </h2>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default SpecialistInfo;