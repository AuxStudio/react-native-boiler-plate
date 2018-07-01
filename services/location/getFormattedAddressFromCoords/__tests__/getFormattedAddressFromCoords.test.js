import getFormattedAddressFromCoords from '..'; // eslint-disable-line

jest.mock('react-native-geocoder', () => {
  return {
    geocodePosition: jest.fn(() => {
      return new Promise((resolve) => {
        resolve({ address: 'Some place' });
      });
    }),
  };
});

describe('getFormattedAddressFromCoords', () => {
  it('resolves a promise if lat and lng are supplied', async () => {
    const lat = 32;
    const lng = 28;

    expect.assertions(1);
    const response = await getFormattedAddressFromCoords(lat, lng);
    expect(response).toEqual({ data: { address: 'Some place' } });
  });

  it('rejects with error if lat is not supplied', async () => {
    try {
      const lat = null;
      const lng = 28;

      expect.assertions(1);
      await getFormattedAddressFromCoords(lat, lng);
    } catch (error) {
      expect(error).toEqual(new Error('Latitude is required'));
    }
  });

  it('rejects with error if lng is not supplied', async () => {
    try {
      const lat = 32;
      const lng = null;

      expect.assertions(1);
      await getFormattedAddressFromCoords(lat, lng);
    } catch (error) {
      expect(error).toEqual(new Error('Longitude is required'));
    }
  });
});
