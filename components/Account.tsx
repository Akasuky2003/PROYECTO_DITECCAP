import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import Avatar from "./Avatar";

import { Database } from "../utils/database.types";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [location, setLocation] = useState<Profiles["location"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);
  const [dni, setDNI] = useState<Profiles["dni"]>(null);
  const [phone, setPhone] = useState<Profiles["phone"]>(null);
  const [birthdate, setBirthdate] = useState<Profiles["birthdate"]>(null);
  const [full_name, setFullName] = useState<Profiles["full_name"]>(null);

  const current = new Date().toISOString().split("T")[0];
  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `username, location, avatar_url, dni, genre, birthdate, phone, full_name`
        )
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setLocation(data.location);
        setAvatarUrl(data.avatar_url);
        setPhone(data.phone);
        setDNI(data.dni);
        setBirthdate(data.birthdate);
        setFullName(data.full_name);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    location,
    avatar_url,
    full_name,
    dni,
    phone,
    birthdate,
  }: {
    username: Profiles["username"];
    location: Profiles["location"];
    avatar_url: Profiles["avatar_url"];
    full_name: Profiles["full_name"];
    dni: Profiles["dni"];
    phone: Profiles["phone"];
    birthdate: Profiles["birthdate"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        location,
        avatar_url,
        full_name,
        dni,
        phone,
        birthdate,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({
            username,
            location,
            full_name,
            dni,
            phone,
            birthdate,
            avatar_url: url,
          });
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username || ""} disabled />
      </div>
      <div>
        <label htmlFor="dni">DNI</label>
        <input
          id="dni"
          type="text"
          pattern="[0-9]{9}"
          value={dni || ""}
          onChange={(e) => setDNI(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Telefono</label>
        <input
          id="phone"
          type="tel"
          pattern="[0-9]{9}"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="birthdate">Fecha de nacimiento</label>
        <input
          id="birthdate"
          min="1923-01-01"
          max={current}
          type="date"
          value={birthdate ? `${birthdate}` : ""}
          onChange={(e) => setBirthdate(new Date(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={location || ""}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({
              username,
              location,
              avatar_url,
              full_name,
              dni,
              phone,
              birthdate,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
