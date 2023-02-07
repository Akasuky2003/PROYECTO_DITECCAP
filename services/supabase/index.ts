import { createClient } from "@supabase/supabase-js";
import { Database } from "@/utils/database.types";

const supabase = createClient(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
);

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export async function getPhone() {
    const user = await getCurrentUser()
    const { data, error } = await supabase
        .from('Personal')
        .select('phone')
        .eq("id", 5)
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