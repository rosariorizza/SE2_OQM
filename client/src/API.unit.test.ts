import API from './API'; //Adjust the path as needed
import fetchMock from 'jest-fetch-mock'; //Import jest-fetch-mock for mocking

//before any tests, set up fetch to be mocked
beforeAll(() => {
  fetchMock.enableMocks();
});

//after all tests, restore fetch to its original state
afterAll(() => {
  fetchMock.dontMock();
});

//reset the fetch mock before each test to start with a clean slate
beforeEach(() => {
  fetchMock.resetMocks();
});

// #region Services

describe('getServices', () => {
  it('should return the expected data when fetch is successful', async () => {
    const mockResponse = [{ id: 1, name: 'Service 1' }, { id: 2, name: 'Service 2' }];

    //mock the fetch response
    fetchMock.mockResponse(JSON.stringify(mockResponse), { status: 200 });

    //call the function and expect the result
    const result = await API.getServices();

    //ensure the fetch function was called with the correct URL
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/services`);

    //ensure the result matches your mock response
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when fetch fails', async () => {
    //mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //call the function and expect it to throw an error
    await expect(API.getServices()).rejects.toThrow('Internal server error');
  });
});

describe('getService', () => {
  it('should return the expected service when fetch is successful', async () => {
    const mockService = { id: 1, description: 'Service 1',  type: "Service1", time: 10 };

    //mock the fetch response for a successful request
    fetchMock.mockResponse(JSON.stringify(mockService), { status: 200 });

    //call the function and expect the result
    const result = await API.getService(1);

    //ensure the fetch function was called with the correct URL
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/services/1`);

    //ensure the result matches your mock service
    expect(result).toEqual(mockService);
  });

  it('should throw an error when fetch fails', async () => {
    //mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //call the function and expect it to throw an error
    await expect(API.getService(1)).rejects.toThrow('Internal server error');
  });
});

describe('createService', () => {
  const mockService = { id: 1, description: 'Service 1',  type: "Service1", time: 10 };
  const mockServiceCreation = {description: "Service marked as 1", type: "Service1"};

  it('should return the created service when the request is successful', async () => {

    //Mock the fetch response for a successful request
    fetchMock.mockResponse(JSON.stringify(mockService), { status: 201 });

    //Call the function and expect the result
    const result = await API.createService(mockServiceCreation);

    //Ensure the fetch function was called with the correct URL and method
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...mockServiceCreation, time: 0 }),
    });

    //Ensure the result matches your mock service
    expect(result).toEqual(mockService);
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.createService(mockServiceCreation)).rejects.toThrow('Internal server error');
  });
});

describe('updateService', () => {
  const mockService = { id: 1, description: 'Service 1',  type: "Service1", time: 10 };
  const mockServiceCreation = { description: 'Service marked as 1', type: 'Service1' };

  it('should return the updated service when the request is successful', async () => {
    const updatedService = { ...mockService, name: 'Updated Service 1' };

    //Mock the fetch response for a successful request
    fetchMock.mockResponse(JSON.stringify(updatedService), { status: 200 });

    //Call the function and expect the result
    const result = await API.updateService(mockService.id, mockServiceCreation);

    //Ensure the fetch function was called with the correct URL and method
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/services/${mockService.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockServiceCreation),
    });

    //Ensure the result matches the updated service
    expect(result).toEqual(updatedService);
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.updateService(mockService.id, mockServiceCreation)).rejects.toThrow('Internal server error');
  });
});

describe('deleteService', () => {
  const mockService = { id: 1, description: 'Service 1',  type: "Service1", time: 10 };

  it('should return the deleted service when the request is successful', async () => {
    //Mock the fetch response for a successful request
    fetchMock.mockResponse(JSON.stringify(mockService), { status: 200 });

    //Call the function and expect the result
    const result = await API.deleteService(mockService.id);

    //Ensure the fetch function was called with the correct URL and method
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/services/${mockService.id}`, {
      method: 'DELETE',
    });

    //Ensure the result matches the deleted service
    expect(result).toEqual(mockService);
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.deleteService(mockService.id)).rejects.toThrow('Internal server error');
  });
});

// #endregion

// #region User
//this actually doesn't need to be tested yetService
// #endregion

// #region Time

describe('getWaitingTime', () => {
  const mockService = { id: 1, description: 'Service 1',  type: "Service1", time: 10 };
  const mockQueueResponse = { hour: 1, minutes: 1 };
  
  it('should return the waiting time when the request is successful', async () => {
    //Mock the fetch response for a successful request
    fetchMock.mockResponse(JSON.stringify(mockQueueResponse), { status: 200 });

    //Call the function and expect the result
    const result = await API.getWaitingTime(mockService);

    //Ensure the fetch function was called with the correct URL and method
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/queue/${mockService.type}`, {
      method: 'GET',
    });

    //Ensure the result matches the mock queue response
    expect(result).toEqual(mockQueueResponse);
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.getWaitingTime(mockService)).rejects.toThrow('Internal server error');
  });
});

// #endregion

// #region Queue

describe('insertIntoQueue', () => {
  const mockService = { id: 1, description: 'Service 1',  type: "Service1", time: 10 };
  const mockCustomerID = 123;
  
  it('should return the customer ID when the request is successful', async () => {
    //Mock the fetch response for a successful request
    fetchMock.mockResponse(JSON.stringify(mockCustomerID), { status: 200 });

    //Call the function and expect the result
    const result = await API.insertIntoQueue(mockService);

    //Ensure the fetch function was called with the correct URL and method
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/queque/${mockService.id}`, {
      method: 'PUT',
    });

    //Ensure the result matches the mock customer ID
    expect(result).toEqual(mockCustomerID);
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.insertIntoQueue(mockService)).rejects.toThrow('Internal server error');
  });
});

describe('callNextCustomer', () => {
  const mockCounterId = 1;
  const mockRemaining = 2;

  it('should return 1 and log when the request is successful', async () => {
    //Mock the fetch response for a successful request
    fetchMock.mockResponse(JSON.stringify(mockRemaining), { status: 200 });

    //Mock console.log to capture the log
    const consoleLogSpy = jest.spyOn(console, 'log');

    //Call the function and expect the result
    const result = await API.callNextCustomer(mockCounterId);

    //Ensure the fetch function was called with the correct URL and method
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/queue/${mockCounterId}/next`, {
      method: 'DELETE',
    });

    //Ensure the result is 1
    expect(result).toEqual(1);

    //Ensure console.log was called with the expected message
    expect(consoleLogSpy).toHaveBeenCalledWith(`Customer number ${mockRemaining} to Counter #${mockCounterId}`);

    //Restore the original console.log
    consoleLogSpy.mockRestore();
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.callNextCustomer(mockCounterId)).rejects.toThrow('Internal server error');
  });
});

// #endregion

// #region Counter
//these methods needs rework for the path part
describe('getCounters', () => {
  const mockCounters = [{ id: 1, name: 'Counter 1' }, { id: 2, name: 'Counter 2' }];

  it('should return counters when the request is successful', async () => {
    //Mock the fetch response for a successful request
    fetchMock.mockResponse(JSON.stringify(mockCounters), { status: 200 });

    //Call the function and expect the result
    const result = await API.getCounters();

    //Ensure the fetch function was called with the correct URL and method
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/counters`, {
      method: 'GET',
    });

    //Ensure the result matches the mock counters
    expect(result).toEqual(mockCounters);
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.getCounters()).rejects.toThrow('Internal server error');
  });
});

describe('assignCounter', () => {
  const mockServiceId = 1;
  const mockCounterId = 1;

  it('should succeed when the request is successful', async () => {
    //Mock the fetch response for a successful request
    fetchMock.mockResponse('', { status: 200 });

    //Call the function and expect it to succeed (no error thrown)
    await expect(API.assignCounter(mockServiceId, mockCounterId)).resolves.toBeUndefined();

    //Ensure the fetch function was called with the correct URL
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/services/${mockServiceId}/counters/${mockCounterId}`);
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.assignCounter(mockServiceId, mockCounterId)).rejects.toThrow('Internal server error');
  });
});

describe('removeCounter', () => {
  const mockServiceId = 1;
  const mockCounterId = 1;

  it('should succeed when the request is successful', async () => {
    //Mock the fetch response for a successful request
    fetchMock.mockResponse('', { status: 200 });

    //Call the function and expect it to succeed (no error thrown)
    await expect(API.removeCounter(mockServiceId, mockCounterId)).resolves.toBeUndefined();

    //Ensure the fetch function was called with the correct URL and method
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/services/${mockServiceId}/counters/${mockCounterId}`, {
      method: 'DELETE',
    });
  });

  it('should throw an error when the request fails', async () => {
    //Mock the fetch response to simulate a failed request
    fetchMock.mockResponse('', { status: 500 });

    //Call the function and expect it to throw an error
    await expect(API.removeCounter(mockServiceId, mockCounterId)).rejects.toThrow('Internal server error');
  });
});

//#endregion