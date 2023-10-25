import { getServices } from './API';

describe('getServices', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should call the API and return the list of services', async () => {
    const mockServices = [{ id: 1, name: 'Service 1' }, { id: 2, name: 'Service 2' }];
    fetch.mockResponseOnce(JSON.stringify(mockServices));

    const services = await getServices();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/api/services');
    expect(services).toEqual(mockServices);
  });

  it('should throw an error if the API call fails', async () => {
    fetch.mockRejectOnce(new Error('Internal server error'));
    await expect(getServices()).rejects.toThrow('Internal server error');
  });
});