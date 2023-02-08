import Link from "next/link";
import styles from "@/styles/Home.module.css";
export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link legacyBehavior href={"/"}>
        <a className={styles.DITECCAP}>DITECCAP</a>
      </Link>
      <Link legacyBehavior href={"/signin"}>
        <a className={styles.ingresobutton}>login</a>
      </Link>

      <Link legacyBehavior href={"/about"}>
        <a className={styles.quienessomos} style={{ marginLeft: "60px" }}>
          ¿Quienes Somos?
        </a>
      </Link>
      <Link legacyBehavior href="/products">
        <a className={styles.productos}>Productos</a>
      </Link>
      <Link legacyBehavior href={"/index"}>
        <a className={styles.contactanos} style={{ marginLeft: "40px" }}>
          Contactanos
        </a>
      </Link>
    </div>
  );
}
