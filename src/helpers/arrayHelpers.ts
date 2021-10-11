export function groupBy<V, K>(
    list: Array<V>,
    keyGetter: (input: V) => K
): Map<K, Array<V>> {
    const map = new Map<K, Array<V>>()
    list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    })
    return map
}

export const getAllValues = (
    data: any[] | undefined | null,
    findValue: (item: any) => string
) => {
    if (data) {
        const result: string[] = []
        const groupped = groupBy<any, string>(data || [], findValue)

        groupped.forEach((_, key) => result.push(key))

        return result
    }

    return []
}
