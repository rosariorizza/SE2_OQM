import { Service, ServiceCreation, User, UserCreation, Time} from "./models";

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
        method: 'PUT',
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

// #endregion



// #region Time

const getWaitingTime = async (service: Service) => {
    //TODO: create the queque management and change the url to get the queque
    // the queque should have all the field required for the Formula.
    // A safer option would be to implement the computation on the server side and just return the time
    const response = await fetch(SERVER_URL + `/api/queue/${service.type}`, {
        method: 'GET'
    });
    if(response.ok) {
       //Compute formula, the epress the time as 2 numbers: hours and minutes
        return {hour:1, minutes:1};
    }
    else
      throw new Error('Internal server error');
}

// #endregion



// #region Queue

const insertIntoQueque = async (service: Service) => {
  const response = await fetch(`${SERVER_URL}/queque/${service.type}`, {
    method: 'POST'
  });
  if (response.ok) {
    //returns the user's waiting number
    const customer: number = await response.json(); 
    return customer;
  } else {
    throw new Error('Internal server error');
  }
};

const callNextCustomer = async (counterId: number) => {
  const response = await fetch(`${SERVER_URL}/services/${counterId}/next`, {
    method: 'DELETE'
  });
  if (response.ok) {
    //returns the next customer for the counter (aka removes it from the queue)
    const remaining: number = await response.json(); 
    if(remaining != 0)
      console.log("Customer number "+remaining+" to Counter #"+counterId);
    return;
  } else {
    throw new Error('Internal server error');
  }
};

// #endregion


const API = {
    getServices, getService, updateService, createService, deleteService,
    getUsers, getUser, createUser, updateUser, deleteUser,
    getWaitingTime,
    insertIntoQueque, callNextCustomer
};

export default API;
