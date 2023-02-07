import Link from "next/link";
import styles from '@/styles/Home.module.css'
export default function Navbar(){
    return(
    <div className={styles.navbar}>
      <Link legacyBehavior href={"/hola"}>
      <a className={styles.DITECCAP} onClick={() => window.location.href='/index'}>DITECCAP</a>
      </Link>
      <Link legacyBehavior href={"/hola"}>
      <a className={styles.ingresobutton} onClick={() => window.location.href='/login'}>login</a>
      </Link>
      
      
    <Link legacyBehavior href={"/hola"}>
    <a className={styles.quienessomos} style={{ marginLeft: '60px' }}>¿Quienes Somos?</a>
    </Link>
    <Link  legacyBehavior href="/productos">
      <a className={styles.productos}>Productos</a>
    </Link>
    <Link legacyBehavior href={"/contactos"}>
    <a className={styles.contactanos} style={{ marginLeft: '40px' }}>Contactanos</a>
    </Link>
    
    
  </div>
    )
}