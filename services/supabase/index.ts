import { createClient } from "@supabase/supabase-js";
import { Database } from "@/utils/database.types";

const supabase = createClient(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    { auth: { storageKey: "sbp_2447a19bf018be821e07bd1d79b5db62d4b0edae"}}
);


type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export async function getPhone() {
    const { data, error } = await supabase
        .from('Personal')
        .select('phone')
        .eq("id", 1)
        // .eq("user_id", user?.user.id)
    if (error) {
        console.log("Error", error);
        return [];
    }

    return data || [];
}

async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log("Error", error);
        return;
    }

    return data;
}