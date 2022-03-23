export function castModel<T>( 
    instance,
    castDescription ) 
{
    return Object.keys(instance).reduce(
        (casted,key) => ({
            ...casted,
            [key]: castDescription[key] 
                ? castDescription[key](instance[key]) 
                : instance[key]
        }),{}
    ) as T
}