export const formatDateString = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const day = date.getDate();

    const getDayWithOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return `${day}th`;
        }
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    const dayWithSuffix = getDayWithOrdinalSuffix(day);
    const formattedDate = `${month} ${dayWithSuffix}`;
    return formattedDate;
};


export const formatTimeString = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours}:${minutes}`
    return formattedTime;
}