export{}
declare global {
    type Project = {
        _id?: {$oid: number} | number,
        title: string,
        description?: string,
        date?: string,
        url?: string
    }


}