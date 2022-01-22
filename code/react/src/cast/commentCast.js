export default function commentCast(comment)
{
    return {
        _id:comment._id,
        author:comment.author,
        text:comment.text,
        createdAt:new Date(comment.createdAt)
    }
}