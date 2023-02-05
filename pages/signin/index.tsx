import type { NextPage } from "next";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Account";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <div className="row">
          <div className="col-6">
            <h1 className="header">DITECCAP</h1>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              nisl ut dui vestibulum commodo in nec tortor. Pellentesque arcu
              ligula, tincidunt ac neque a, venenatis condimentum nulla. In
              efficitur metus feugiat risus scelerisque vestibulum. Nullam non
              libero pulvinar, ornare justo non, hendrerit urna. Nunc vitae odio
              at nisi tristique fringilla ac vel erat. Curabitur gravida, lectus
              vitae lobortis ullamcorper, tellus mauris dapibus ipsum, eget
              aliquam lacus augue at turpis. Sed rutrum rutrum nisl, et
              malesuada mi. Pellentesque eget diam vulputate, convallis dui sit
              amet, pharetra orci. In eu semper nulla, in cursus tellus.
            </p>
          </div>
          <div className="col-6 auth-widget">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          </div>
        </div>
      ) : (
        <>
          <h3>Account</h3>
          <Account session={session} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
