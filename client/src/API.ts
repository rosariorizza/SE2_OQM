import { Counter, Service, ServiceCreation, User, Time, UserCreation} from "./models";

const SERVER_URL = 'http://localhost:3000';

// #region Services

const getServices = async () => {
    const response = await fetch(SERVER_URL + '/api/services');
    if(response.ok) {
        const services : Service[] = await response.json();
        return services;
    }
    else
      throw new Error('Internal server error');
}
const getService = async (id: number) => {
    const response = await fetch(SERVER_URL + `/api/services/${id}`);
    if(response.ok) {
        const service : Service = await response.json();
        return service;
    }
    else
      throw new Error('Internal server error');
}
const createService = async (service: ServiceCreation) => {
    const response = await fetch(`${SERVER_URL}/api/services`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(service),
        //should be fixed
      });
    if(response.ok) {
        const service : Service = await response.json();
        return service;
    }
    else
      throw new Error('Internal server error');
}
const updateService = async (id: number, service: ServiceCreation) => {
    const response = await fetch(`${SERVER_URL}/api/services/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(service),
      });
    if(response.ok) {
        const service : Service = await response.json();
        return service;
    }
    else
      throw new Error('Internal server error');
}

const deleteService = async (id: number) => {
    const response = await fetch(SERVER_URL + `/api/services/${id}`, {
        method: 'DELETE'
    });
    if(response.ok) {
        const service : Service = await response.json();
        return service;
    }
    else
      throw new Error('Internal server error');
}

// #endregion



// #region Users

const getUsers = async () => {
    const response = await fetch(SERVER_URL + '/api/users');
    if(response.ok) {
        const users : User[] = await response.json();
        return users;
    }
    else
      throw new Error('Internal server error');
}

const getUser = async (id: number) => {
    const response = await fetch(SERVER_URL + `/api/users/${id}`);
    if(response.ok) {
        const user : User = await response.json();
        return user;
    }
    else
      throw new Error('Internal server error');
}

const createUser = async (user: UserCreation) => {
    const response = await fetch(`${SERVER_URL}/api/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
      });
    if(response.ok) {
        const user : User = await response.json();
        return user;
    }
    else
      throw new Error('Internal server error');
}
const updateUser = async (id: number, user: UserCreation) => {
    const response = await fetch(`${SERVER_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
      });
    if(response.ok) {
        const user : User = await response.json();
        return user;
    }
    else
      throw new Error('Internal server error');
}

const deleteUser = async (id: number) => {
    const response = await fetch(SERVER_URL + `/api/users/${id}`, {
        method: 'DELETE'
    });
    if(response.ok) {
        const user : User = await response.json();
        return user;
    }
    else
      throw new Error('Internal server error');
}

/*const callNextCustomer = async (counterId: number) => {
    const response = await fetch(`${SERVER_URL}/services/${counterId}/next`, {
      method: 'POST'
    });
    if (response.ok) {
      //const customer: User = await response.json();
      console.log("Customer called");
      //return customer;
      return 1;
    } else {
      throw new Error('Internal server error');
    }
  };*/

// #endregion



// #region Time

const getWaitingTime = async (service: Service) => {
    const response = await fetch(SERVER_URL + `/api/services/${service.id}/estimatedTime`, {
        method: 'GET'
    });
    if(response.ok) {
       //Compute formula, the epress the time as 2 numbers: hours and minutes
        const time: Time = await response.json();
        return time;

    }
    else {
      throw new Error('Internal server error');
    }
}

// #endregion



// #region Queue

const generateQueues = async (ids: number[]) => {
  const response = await fetch(`${SERVER_URL}/api/queue`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ids: ids})
  });
  console.log("Generated IDS: "+ids);
  if (response.ok) {
    //returns the number of created queues
    return await response.json(); 
  } else {
    throw new Error('Internal server error');
  }
};

const insertIntoQueue = async (service: Service) => {
  const response = await fetch(`${SERVER_URL}/api/queue/${service.id}`, {
    method: 'PUT'
  });
  if (response.ok) {
    //returns the user's waiting number
    const customerID: number = await response.json(); 
    return customerID;
  } else {
    throw new Error('Internal server error');
  }
};

const callNextCustomer = async (counterId: number) => {
  const response = await fetch(`${SERVER_URL}/api/queue/${counterId}/next`, {
    method: 'DELETE'
  });
  if (response.ok) {
    //returns the next customer for the counter (aka removes it from the queue)
    const next: number = await response.json(); 
    if(next != 0)
      alert("Customer number "+next+" to Counter #"+counterId);
    else
      alert("No customers to serve now");
    return next; 
  } else {
    throw new Error('Internal server error');
  }
};

// #endregion

// #region Counter

const getCounters = async () => {
  const response = await fetch(SERVER_URL + '/api/services/counters', {
    method: 'GET'
  });
  if(response.ok) {
      const counters : Counter[] = await response.json();
      return counters;
  }
  else
    throw new Error('Internal server error');
}

const getAssignedCounters = async (serviceId: number) => {
  const response = await fetch(SERVER_URL + `/api/services/${serviceId}/counters`, {
    method: 'GET'
  });
  if(response.ok) {
      const counters : Counter[] = await response.json();
      return counters;
  }
  else
    throw new Error('Internal server error');
}

const assignCounter = async (serviceId: number, counterId: number) => {
  const response = await fetch(SERVER_URL + `/api/services/${serviceId}/counters/${counterId}`, {
    method: 'PATCH'
  });
  if(response.ok) {
    return;
  }
  else
    throw new Error('Internal server error');
}
const removeCounter = async (serviceId: number, counterId: number) => {
  const response = await fetch(SERVER_URL + `/api/services/${serviceId}/counters/${counterId}`, {
    method: 'DELETE'
  });
  if(response.ok) {
    return;
  }
  else
    throw new Error('Internal server error');
}

// #endregion


const API = {
    getServices, getService, updateService, createService, deleteService,
    getUsers, getUser, createUser, updateUser, deleteUser,
    getWaitingTime,
    generateQueues, insertIntoQueue, callNextCustomer,
    getCounters, assignCounter, removeCounter, getAssignedCounters

};

export default API;
