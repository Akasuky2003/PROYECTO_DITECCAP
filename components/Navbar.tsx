import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";
import styles from "../components/style/navbar.module.css";
import { useRouter } from "next/router";
export default function Navbar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  function signOutUser() {
    supabaseClient.auth.signOut();
    router.push("/");
  }

  return (
    <div className={styles.navbar}>
      <Link legacyBehavior href={"/"}>
        <a className={styles.DITECCAP}>DITECCAP</a>
      </Link>
      <ul className={styles.navlinks}>
        <li className={styles.navitem}>
          <Link legacyBehavior href={"/about"}>
            <a className={styles.textnabvar}>¿Quienes Somos?</a>
          </Link>
        </li>
        <li className={styles.navitem}>
          <Link legacyBehavior href="/products">
            <a className={styles.textnabvar}>Productos</a>
          </Link>
        </li>
        <li className={styles.navitem}>
          {user ? (
            <>
              <Link href={"/signin"}>Hola, {user?.email}</Link>
              <button onClick={() => signOutUser()}>Sign Out</button>
            </>
          ) : (
            <Link legacyBehavior href={"/signin"}>
              <a className={styles.textnabvar}>login</a>
            </Link>
          )}
        </li>
        <li className={styles.navitemcart}>
          <Link legacyBehavior href={"/cart"}>
            <a className={styles.imgcart}>
              <img
                src="/cart-shopping-solid.svg"
                alt="Image"
                className={styles.imgbutton}
              />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
