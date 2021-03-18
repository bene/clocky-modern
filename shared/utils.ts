function calcDuration(start: Date, end: Date) {
    return !!start ? Math.abs((!!end ? end.getTime() : new Date().getTime()) - start.getTime()) : 0;
}

function isToday(date: Date) {
    const today = new Date();

    return (
        date.getUTCDate() === today.getUTCDate() &&
        date.getUTCMonth() === today.getUTCMonth() &&
        date.getUTCFullYear() === today.getUTCFullYear()
    );
}

function capitalize(str: string) {
    return str[0].toUpperCase() + str.substring(1);
}

export { calcDuration, isToday, capitalize };
