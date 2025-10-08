export default function ServiceCard() {
    return (
        <>
            <div className="card mb-3" style={{height:"60px",width:"400px"}}>
                <img src="./images.jpeg" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
            </div>
        </>
    )
}