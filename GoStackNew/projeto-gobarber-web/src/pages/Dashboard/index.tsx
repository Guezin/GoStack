import React, { useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectDate] = useState(new Date());

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt="" />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-Feira</span>
          </p>

          <NextAppointment>
            <strong>Atentidemento a seguir</strong>
            <div>
              <img
                src="http://localhost:3333/files/0435bfcf5aad080d3495-20200330_101837.jpg"
                alt="Leandro Guezin Jr"
              />

              <strong>Leandro Guezin Jr</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/0435bfcf5aad080d3495-20200330_101837.jpg"
                  alt="Leandro Guezin Jr"
                />

                <strong>Leandro Guezin Jr</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/0435bfcf5aad080d3495-20200330_101837.jpg"
                  alt="Leandro Guezin Jr"
                />

                <strong>Leandro Guezin Jr</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/0435bfcf5aad080d3495-20200330_101837.jpg"
                  alt="Leandro Guezin Jr"
                />

                <strong>Leandro Guezin Jr</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};
export default Dashboard;
