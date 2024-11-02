export const formatAdvertisementDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentDate = new Date();

    const differenceDays = Math.ceil((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60))

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const hoursInCurrentDay = (new Date().getTime() - startOfDay.getTime())/(1000*60*60);
    const formattedTime = date.toLocaleTimeString('uk-Ua', {
        hour: '2-digit',
        minute: '2-digit',
    })

    if (differenceDays < hoursInCurrentDay) { return `Сьогодні ${formattedTime}` }
    if (differenceDays > hoursInCurrentDay) { return `Вчора ${formattedTime}` }
    
    return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    }) + `${formattedTime}`;
}

export default formatAdvertisementDate;