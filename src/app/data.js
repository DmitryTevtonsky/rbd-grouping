export const setData = () => {
    const data = {}
    for (let index = 0; index < 10; index++) {
        const item = {
            id: `task${index}}`,
            content: 'lol'
        }
        Object.assign(data, item)
    }
    return data
}