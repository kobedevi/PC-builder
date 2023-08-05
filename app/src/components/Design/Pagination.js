const Pagination = ({page, perPage, perPageClick, pageAmount=1, onClick}) => {
    if(pageAmount <= 0) {
        pageAmount =1;
    }
    let array = [];
    for (let i = 1; i <= pageAmount; i++) {
        array.push(
            <li key={i} className={page === i-1 ? 'active' : ''}>
                <button disabled={page === i-1} onClick={(e) => {
                    e.preventDefault()
                    onClick(i-1)
                }}>{i}</button>
            </li>
        )
    }

    return(
        <>
            <nav className="pagination">
                <ul>
                    <li key='0'>
                        <button disabled={page === 0} onClick={(e) => {
                            e.preventDefault()
                            onClick(page - 1)
                        }}>&lt;</button>
                    </li>
                    {array}
                    <li key={pageAmount+1}>
                        <button disabled={page === pageAmount -1} onClick={(e) => {
                            e.preventDefault()
                            onClick(page + 1)
                        }}>&gt;</button>
                    </li>
                </ul>
                <ul className='perPage'>
                    <li className={perPage === 10 ? 'active': ''} >
                        <button onClick={(e) => {
                            e.preventDefault()
                            perPageClick(10)
                        }}>
                            10
                        </button>
                    </li>
                    <li className={perPage === 20 ? 'active': ''}>
                        <button onClick={(e) => {
                            e.preventDefault()
                            perPageClick(20)
                        }}>
                            20
                        </button>
                    </li>
                    <li className={perPage === 50 ? 'active': ''} >
                        <button onClick={(e) =>  {
                            e.preventDefault()
                            perPageClick(50)
                        }}>
                            50
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}


export default Pagination;