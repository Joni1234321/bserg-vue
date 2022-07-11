export {}

type ObjectId = { $oid: string }
declare global {
    interface DBSchema {
        schema_version: number,
    }
    interface Project extends DBSchema{
        _id?: ObjectId,
        title: string,
        description?: string,
        date?: string,
        url?: string,
        sections: {
            title: string,
            fields: {
                type: string,
                value: string | number
            }[]
        }[]
    }
}