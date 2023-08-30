export type UnresolvedUnit = {
    _id: string,
    name: string
}

export type ResolvedUnit = {
    _id: string,
    name: string,
    type: string
}

export type Unit = {
    _id?: string,
    shortName: string,
    longName: string,
    userId?: string,
    createdAt?: string,
    updatedAt?: string,
}

export type CastedUnit = {
    _id?: string,
    shortName: string,
    longName: string,
    userId?: string,
    createdAt?: Date,
    updatedAt?: Date,
}