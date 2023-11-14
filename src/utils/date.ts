import { isValid } from 'date-fns';

const prettifyDate = (dateString: string): { date: string; time: string } => {
  const date = new Date(dateString);

  if (!isValid(date)) {
    throw new Error('Invalid date');
  }

  return {
    date: date.toLocaleDateString('en', {
      day: 'numeric',
      month: 'short',
    }),
    time: date.toLocaleTimeString('ru', {
      hour: 'numeric',
      minute: 'numeric',
    }),
  };
};

export { prettifyDate };
