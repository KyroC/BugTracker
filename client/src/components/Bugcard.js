import './Bugcard.css'

const Bugcard = ({bugs}) => {
    return(
            bugs.map(bug => 
                <div className="bug-card">
                <div className="bug-card-top">
                    <div className="bug-card-title"> <h3>{bug.title}</h3> </div>
                    <div className="bug-card-author"> {bug.author}</div>
                </div>
                <div className="bug-card-description">{bug.description}</div>
                <div className="bug-card-bottom">
                    <div className="bug-card-team">{bug.team}</div>
                    <div className="bug-card-comment">{bug.comment}</div>
                </div>
            </div>
            )
    )
}

export default Bugcard;