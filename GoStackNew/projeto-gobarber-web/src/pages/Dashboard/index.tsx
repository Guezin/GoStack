import React, { useState, useCallback } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectDate(day);
    }
  }, []);

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
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Feveiro',
              'MArço',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
