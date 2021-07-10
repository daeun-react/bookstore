import useBookList from "hooks/useBookList";
import useInfiniteScroll from "hooks/useInfiniteScroll";

import SearchForm from "components/SearchForm";
import BookList from "components/BookList";
import Loader from "components/Loader";

function App() {
  const [bookList, fetchBookList] = useBookList();
  const { data, loading, query } = bookList;
  useInfiniteScroll(query, fetchBookList);

  return (
    <>
      <SearchForm fetchBookList={fetchBookList} />
      <BookList bookList={bookList} />
      <Loader visible={data && data.length && loading} />
    </>
  );
}

export default App;
