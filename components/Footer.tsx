import styles from "../components/style/footer.module.css"
export default function Footer({}) {
  return (
    <>
    <footer className={styles.container}>
    <div className={styles.footer}>
      <div className={styles.titulofooter}>
        <h1>DITECCAP</h1>
        <p>@copyright DITECCAP 2023</p>
      </div>
    </div>
    </footer>
    </>
  );
}
