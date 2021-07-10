import { v4 as uuidv4 } from "uuid";
import Book from "components/Book";
import "./BookList.scss";

const info = (text) => <div className="info">{text}</div>;

function BookList({ bookList }) {
  const { loading, error, data } = bookList;

  if (loading && !data) return info("로딩 중...");
  if (error) return info("에러 발생");
  if (!data) return info("검색어를 입력해주세요.");
  if (!data.length) return info("검색 결과가 없습니다.");

  return (
    <ul className="book-list">
      {data.map((book) => (
        <Book key={uuidv4()} book={book} />
      ))}
    </ul>
  );
}

export default BookList;
