import { useReducer } from "react";
import Kakao from "api/Kakao";
import sleep from "utils/sleep";

const initialState = {
  query: "",
  loading: false,
  data: null,
  error: null,
  page: 1,
  isEnd: false
};

const PENDING = "FETCH_BOOKLIST_PENDING";
const SUCCESS = "FETCH_BOOKLIST_SUCCESS";
const FAILURE = "FETCH_BOOKLIST_FAILURE";

function reducer(state, action) {
  const { type, loadMore, query, data, isEnd, error } = action;

  switch (type) {
    case PENDING:
      return {
        query,
        loading: true,
        data: loadMore ? state.data : null,
        error: null,
        page: loadMore ? state.page : 1,
        isEnd: loadMore ? state.isEnd : false
      };

    case SUCCESS:
      return {
        ...state,
        loading: false,
        data: loadMore ? [...state.data, ...data] : data,
        error: null,
        page: state.page + 1,
        isEnd
      };

    case FAILURE:
      return {
        query: "",
        loading: false,
        data: null,
        error,
        page: 1,
        isEnd: false
      };

    default:
      return state;
  }
}

function useBookList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchBookList = async (query, loadMore = false) => {
    const { loading, isEnd, page, data } = state;

    if (loading) return;
    if (loadMore && isEnd) return;
    if (loadMore && (!data || !data.length)) return;

    try {
      dispatch({ type: PENDING, query, loadMore });
      await sleep(500);
      const { data } = await Kakao.fetchBookList({
        query,
        size: 10,
        target: "title",
        page: loadMore ? page : 1
      });

      dispatch({
        type: SUCCESS,
        data: data.documents,
        loadMore,
        isEnd: data.meta.is_end
      });
    } catch (error) {
      dispatch({ type: FAILURE, error });
    }
  };

  return [state, fetchBookList];
}

export default useBookList;
