export const THIN_NON_BREAKING_SPACE = "\u202F"
export const NON_BREAKING_SPACE = "\u00A0"

export const getSymbol = (currencyId: string) => {
    switch (currencyId) {
        case "SUR":
            return "₽"
    }

    return ""
}

export const getIntegerPart = (number: number) => {
    return Math.trunc(number / 100)
        .toString()
        .replace(/\d(?=(\d{3})+$)/g, `$&${THIN_NON_BREAKING_SPACE}`)
}

export const getFractionalPart = (number: number) => {
    const lastDigit = number % 10
    number = Math.trunc(number / 10)
    const secondDigit = number % 10

    return `${secondDigit}${lastDigit}`
}

export const getCurrency = (number: number, currency: string = "₽") => {
    return `${getIntegerPart(number)},${getFractionalPart(
        Math.round(number)
    )}${NON_BREAKING_SPACE}${currency}`
}

export const getDoubleCurrency = (number: number = 0, currencyTicket: string = "RUB") => {

    return number.toLocaleString("ru-RU", {
        style: "currency",
        currency: currencyTicket,
    })
}

export const getPercent = (percent: number) => {
    return `${percent.toLocaleString("ru")}${NON_BREAKING_SPACE}%`
}

export const toIntTwoSign = (number: number) => {
    return Math.trunc(number * 100)
}

export const roundTwoSign = (number: number) => {
    return Math.round(number * 100) / 100
}