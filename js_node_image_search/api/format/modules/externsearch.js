module.exports = function({hits}){
    return hits.map(
        ({
            tags,
            largeImageURL,
            pageURL,
            previewURL
        }) => ({
            snippet:tags,
            url:largeImageURL,
            thumbnail:previewURL,
            context:pageURL
        })
    )
}
