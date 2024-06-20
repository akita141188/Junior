import { Link } from "react-router-dom";
import { useLocation, useSearchParams } from "react-router-dom";
const Pagination = ({pages}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total, currentPage, next, prev, hasNext, hasPrev, limit } = pages;
  const totalPages = Math.ceil(total / limit);
  const location = useLocation();
  const formatUrl = (page)=>{
    return `${location.pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
            // http://localhost:3000/Search?keyword=iphone&page=3
  }

  const renderPagesHTML = (delta = 2) => {
    const pages = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        pages.push(i);
      }
    }
    return pages;
  };
  return (
    <ul className="pagination">
      {
        hasPrev && (
            <li className="page-item">
                <Link className="page-link" to="#">
                Trang trước
                </Link>
            </li>
        )
      }
      {
        renderPagesHTML().map((page)=>
        <li className={`page-item ${currentPage===page && 'active'}`}>
            <Link className="page-link" to={formatUrl(page)}>
            {page}
            </Link>
        </li>
        )
      }
      {
        hasNext && (
            <li className="page-item">
                <Link className="page-link" to="#">
                Trang sau
                </Link>
            </li>
        )
      }
    </ul>
  );
};
export default Pagination;
