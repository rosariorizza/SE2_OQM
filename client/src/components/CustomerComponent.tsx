import React, { useState, useEffect } from 'react';
import { Service, Time } from '../models';
import API from '../API';

function Customer() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    const getServices = async () => {
      const services: Service[] = await API.getServices();
      setServices(services);
    };
    getServices();
  }, []);

  const showTime = (service: Service) => {
    setSelectedService(service);
  };

  const goBack = () => {
    setSelectedService(null);
  };

  return (
    <div>
      <h1>Customer GUI</h1>
      {selectedService ? (
        hasAccepted == false ?
        <WaitingTimeDisplay
          selectedService={selectedService}
          goBack={goBack}
          accept={setHasAccepted}
        /> :
        <AcceptAndShowServices
          selectedService={selectedService}
          goBack={goBack}
          accept={setHasAccepted}
        />
      ) : (
        <ServiceTable services={services} showTime={showTime} />
      )}
    </div>
  );
}

interface ServiceTableProps {
  services: Service[];
  showTime: (service: Service) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services, showTime }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service, index) => (
          <tr key={index}>
            <td>{service.type}</td>
            <td>
              <button
                style={{ backgroundColor: 'magenta' }}
                onClick={() => showTime(service)}
              >
                Show Time
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface WaitingTimeDisplayProps {
  selectedService: Service;
  goBack: () => void;
  accept: (arg:boolean) => void;
}

const WaitingTimeDisplay: React.FC<WaitingTimeDisplayProps> = ({
  selectedService,
  goBack,
  accept
}) => {
  const [waitingTime, setWaitingTime] = useState<Time | null>(null);

  useEffect(() => {
    const getWaitingTime = async () => {
      const waitingTime: Time = await API.getWaitingTime(selectedService);
      console.log(waitingTime);
      setWaitingTime(waitingTime);
    };
    getWaitingTime();
  }, [selectedService]);

  return (
    <div>
      <h2>Waiting Time: {waitingTime ? `${waitingTime.hours}:${waitingTime.minutes}` : 'Loading...'}</h2>
      <button onClick={() => {
        accept(true);
      }}>Accept</button>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};



const AcceptAndShowServices: React.FC<WaitingTimeDisplayProps> = ({selectedService, goBack, accept}) => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const uId: number = await API.insertIntoQueue(selectedService);
      setUserId(uId);
    };
    getUserId();
  }, [selectedService]);

  return (
    <div>
      <h2>Your number: {userId ? `${userId}` : 'Ooops, something went wrong...'}</h2>
      <button onClick={() => {accept(false); goBack();}}>Go Back</button>
    </div>
  );
};

export default Customer;
