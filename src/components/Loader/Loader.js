import classnames from "classnames";
import styles from "./Loader.scss";

const cx = classnames.bind(styles);

const Loader = ({ visible }) =>
  visible ? <div className={cx("info", "center-text")}>로딩 중...</div> : null;

export default Loader;
