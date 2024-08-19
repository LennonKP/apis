export async function getFetchData(url) {
    const data = await fetch(url)

    if (!data.ok) {
        throw new Error("Não foi possível obter os dados, tente novamente.");
    }

    const parsedData = await data.json()
    return parsedData
}

export function removeLetras(string) {
    return string.replace(/\D/g, '')
}