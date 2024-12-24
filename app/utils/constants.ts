import moment from 'moment-timezone';

// Set your desired timezone (e.g., 'America/New_York')
const timezone = 'Asia/Kolkata';


export const BASE_URL: string = 'http://localhost:3000';

//export const BASE_URL: string = 'https://cryptordle-dev-api.scaleupdevops.in';

export const PER_PAGE:number = 4;




export const CURRENT_TIME:Date = new Date(moment.tz(timezone).format('YYYY-MM-DD HH:mm:ss'));