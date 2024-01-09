import { API_TYPE_ERROR_MESSAGE } from '@/constants/errorMessages';
import { FootballMatchApi, LeagueScheduleResponse } from './apiData';

const isObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const hasNecessaryProperties = (
	responseObject: unknown,
	properties: Array<string>,
): boolean => {
	if (isObject(responseObject)) {
		return properties.every(
			(property) => property in responseObject && responseObject[property],
		);
	}

	return false;
};

// check only necessary properties for now
const isFootballMatchApi = (object: unknown): object is FootballMatchApi => {
	const necessaryProperties = ['id', 'utcDate', 'status', 'homeTeam', 'awayTeam'];
	if (!hasNecessaryProperties(object, necessaryProperties)) {
		throw new Error(API_TYPE_ERROR_MESSAGE + ' (matches property)');
	}

	return true;
};

const isLeagueScheduleResponse = (object: unknown): object is LeagueScheduleResponse => {
	const necessaryProperties = [/* 'count',  */ 'filters', 'competition', 'matches'];
	const allPropertiesPersist = hasNecessaryProperties(object, necessaryProperties);

	if (
		!allPropertiesPersist ||
		!isFootballMatchApi((object as { matches: Array<unknown> }).matches[0])
	) {
		throw new Error(API_TYPE_ERROR_MESSAGE + ' (schedule response)');
	}

	return true;
};

export { isLeagueScheduleResponse };
