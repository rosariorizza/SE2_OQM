import React, { useState, useEffect } from 'react';
import { Service, Time } from '../models';
import API from '../API';

function Customer() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
        <WaitingTimeDisplay
          selectedService={selectedService}
          goBack={goBack}
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
}

const WaitingTimeDisplay: React.FC<WaitingTimeDisplayProps> = ({
  selectedService,
  goBack,
}) => {
  const [waitingTime, setWaitingTime] = useState<Time | null>(null);

  useEffect(() => {
    const getWaitingTime = async () => {
      const waitingTime: Time = await API.getWaitingTime(selectedService);
      setWaitingTime(waitingTime);
    };
    getWaitingTime();
  }, [selectedService]);

  return (
    <div>
      <h2>Waiting Time: {waitingTime ? `${waitingTime.hour}:${waitingTime.minutes}` : 'Loading...'}</h2>
      <button onClick={() => acceptAndShowServices(selectedService, goBack)}>Accept</button>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

const acceptAndShowServices = async (selectedService: Service, goBack: () => void) => {
  // Add your API calls or actions here to accept the service
  // After accepting, you can go back to showing the services
  goBack();
};

export default Customer;
