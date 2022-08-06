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
        details?: {
            schema_version: number
            sections?: Section[]
        }
    }

    interface Section {
        title: string,
        fields: {
            type: string,
            value: string | number
        }[]
    }
}