export const getNumericStringDate = (date: string | number) => {
    return new Date(date).toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "Europe/Moscow",
    })
}

export const getNumericStringDateWithTime = (date: string | number) => {
    return new Date(date).toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Moscow",
    })
}

export const getPastDate = (pastDay: number) => {
    const now = new Date()

    now.setDate(now.getDate() - pastDay)

    return now
}
