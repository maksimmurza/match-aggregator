import { ENGLISH_PREMIER_LEAGUE } from './constants';
import { COMPETITION_SCHEDULE } from './endpoints';
import { API_ERROR_MESSAGE } from '@/constants/errorMessages';
import { RequestOptions } from 'https';
import { rapidAPIBaseURL } from './constants';

const footballDataAuthHeaders = {
  headers: {
    'X-Auth-Token': `${process.env.REACT_APP_footballDataToken}`,
  },
};

const rapidAPIAuthHeaders = {
  headers: {
    'x-rapidapi-key': `${process.env.REACT_APP_rapidApiToken}`,
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
  },
};

const getAuthHeaders = (url: string) => {
  return url.includes(rapidAPIBaseURL) ? rapidAPIAuthHeaders : footballDataAuthHeaders;
};

const fetchData = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...getAuthHeaders(url),
      ...options,
    });

    return await response.json();
  } catch (error) {
    console.log(API_ERROR_MESSAGE);
  }
};

export const getEnglishPremierLeagueSchedule = async () => {
  const url = COMPETITION_SCHEDULE(ENGLISH_PREMIER_LEAGUE);
  return await fetchData(url);
};
