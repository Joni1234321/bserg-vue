export{}
declare global {
    type Project = {
        _id?: {$oid: string},
        title: string,
        description?: string,
        date?: string,
        url?: string
    }


}