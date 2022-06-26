import s from "./SnakeEl.module.css";

export default function SnakeEl({ styles }) {
  return <span style={styles} className={s.elem}></span>;
}
