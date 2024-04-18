

export default function dateTimeFormat (date:string) {

    const dateFromMongo = new Date(date);
    
    const options:Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false, // Use 24-hour format
    };
    
    const userLocale = navigator.language; // Get user's preferred language and locale
    
    const userDateFormat = new Intl.DateTimeFormat(userLocale, options);
    const formattedDate = userDateFormat.format(dateFromMongo);
    
    
    return formattedDate;
    
}


// console.log(formattedDate); // Output depends on the user's preferred locale
