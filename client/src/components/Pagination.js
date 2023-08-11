import styles from "./Pagination.module.css"

const Pagination = ({rowsPerPage, totalRows, paginate}) => {
    const pageNumber = []

    for (let i=1; i<=Math.ceil(totalRows/rowsPerPage);i++) {
        console.log(totalRows)
        console.log(rowsPerPage)
        pageNumber.push(i)
        console.log(pageNumber)
    }
    return(
        <div className={styles.paginationContainer}>
            <ul className={styles.pagination}>
                {pageNumber.map((number) => 
                <li key={number} 
                onClick={() => paginate(number)}
                className={styles.pageNumber}>
                    {number}
                </li>
                )}
            </ul>
        </div>
    )

}

export default Pagination