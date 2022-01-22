export default function quoteCast(quote)
{
    return {
        _id:quote._id,
        title: quote.title,
        author: quote.author,
        text: quote.text,
        createdAt: new Date(quote.createdAt),
        updatedAt: new Date(quote.updatedAt),
        comments: quote.comments
    }
}