import { useState, useEffect } from 'react';
import { Service } from "../models";
import API from '../API';

function Customer() {

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const getServices = async () => {
        const services : Service[] = await API.getServices();
        setServices(services);
        };
        getServices();
    }, []);

    
  return (
    <div>
      <h1>Customer GUI</h1>
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
    </div>
  );
}

const showTime = (selectedService: Service) => {
    //This will show the waiting time and a "go back" button or a select button that puts the client in queue (and gives a number)
    console.log(`Showing time for service: ${selectedService.type}`);
  };

export default Customer