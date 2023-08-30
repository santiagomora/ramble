export default function Container({children})
{
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    {children}
                </div>
            </div>
        </div>
    )
}
