import "./Book.scss";
import noImage from "assets/no-picture.jpg";
import formatNumber from "utils/formatNumber";
import formatDateTime from "utils/formatDateTime";

const NA = "NA";
const AVAILABLE = "정상판매";

function Book({ book }) {
  const {
    title,
    thumbnail,
    url,
    authors,
    publisher,
    datetime,
    price,
    sale_price,
    status
  } = book;

  return (
    <li className="book">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <article>
          <h4 className="title" title={title}>
            {title}
          </h4>
          <p className="cover">
            <img
              src={thumbnail ? thumbnail : noImage}
              alt={thumbnail ? "표지 썸네일" : "썸네일 없음"}
            />
          </p>
          <dl className="book-detail">
            <div>
              <dt aria-label="지은이" />
              <dd>{authors[0] || NA}</dd>
            </div>
            <div>
              <dt aria-label="출판사" />
              <dd>{publisher || NA}</dd>
            </div>
            <div>
              <dt aria-label="출판 날짜" />
              <dd>{datetime ? formatDateTime(datetime) : NA}</dd>
            </div>
            <div>
              <dt aria-label="가격" />
              <dd className="price">
                {status === AVAILABLE
                  ? formatNumber(sale_price > 0 ? sale_price : price)
                  : NA}
              </dd>
            </div>
          </dl>
        </article>
      </a>
    </li>
  );
}

export default Book;
