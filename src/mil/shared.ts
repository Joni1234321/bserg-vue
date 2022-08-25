export function getTypeTags(typeString?: string) {
    if (typeString === undefined) return []
    const ar = typeString.split(" ")
    const word = "gun"
    while (ar.indexOf(word) !== -1) {
        const idx = ar.indexOf(word)
        ar[idx - 1] += " " + ar[idx]
        ar.splice(idx, 1)
    }
    return ar
}


// Calculate sizes once, then its faster
const sizesNames = ['undefined', 'team', 'squad', 'platoon', 'column', 'company', 'battalion', 'regiment', 'brigade', 'division', 'corps', 'army', 'army group']
const sizeDict: { [key: string]: number } = {"battery": 5, "troop": 5}
for (let i = 0; i < sizesNames.length; i++)
    sizeDict[sizesNames[i]] = i

const sizeTable = ["ø", "o", "oo", "ooo", "oooo", "l", "ll", "lll", "x", "xx", "xxx", "xxxx", "xxxxx"]
export const getSizeString = (size?: string): string => sizeTable[sizeDict[size?.toLowerCase() ?? 0] ?? 0]
export const compareSizeFunc = (a: string, b: string) => sizeDict[b.toLowerCase()] - sizeDict[a.toLowerCase()]

export function getChildren(org: any) {
    return org?.children
        .map((child: any, i: number) => {
            child.i = i;
            return Array(parseInt(child.n ?? 1)).fill(child)
        })
        .flatMap((child: any) => child)
        .sort((a: any, b: any) => sizeDict[b.size.toLowerCase()] - sizeDict[a.size.toLowerCase()]) ?? []
}