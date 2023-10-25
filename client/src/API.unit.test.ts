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
