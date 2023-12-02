import styles from './index.module.scss'

 const Spinner = () => {
  return (
    <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
  )
}

export default Spinner