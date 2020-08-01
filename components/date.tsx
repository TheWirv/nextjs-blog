import * as React from 'react';
import {parseISO, format} from 'date-fns';

type Props = {
  dateString: string;
};

const Date: React.FC<Props> = (props) => {
  const date = parseISO(props.dateString);
  return <time dateTime={props.dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};

export default Date;
