import type { NextPage } from "next";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Account";
import Footer from "@/components/Footer";
import Image from "next/image";
import { text } from "node:stream/consumers";

const Home: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container-signin" style={{ padding: "100px 0 100px 0" }}>
      <h1 id="header-login" ><a style={{textDecoration:"none", color:"black"}} href="/">DITECCAP</a></h1>
      {!session ? (
        <div className="row-center">
          <h1></h1>
          <div className="col-6">
            <img className="imagenlog" src="/loginlog.jpg" alt="LOGO" />
          </div>
          <div className="col-6 auth-widget">
            <Auth
              providers={["github", "google", "facebook"]}
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="ligth"
            />
          </div>
        </div>
      ) : (
        <>
          <h3>Account</h3>
          <Account session={session} />
        </>
      )}

    </div>
  );
};

export default Home;
