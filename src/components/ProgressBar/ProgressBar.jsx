import styles from './ProgressBar.module.css'

function ProgressBar({ value = 0 }) {
  const pct = Math.min(Math.max(Math.round(value), 0), 100)
  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${pct}%` }} />
      <span className={styles.label}>{pct}%</span>
    </div>
  )
}

export default ProgressBar
