import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
);


// export async function getName() {
//     const { data: Personal, error } = await supabase.from('Personal').select('name')
//     console.log(await supabase.from('Personal').select('name'))
//     return Personal
// }

// export async function getCurrentUser() {
//     const { data, error } = await supabase.auth.getUser();

//     if (error) {
//         console.log("Error", error);
//         return;
//     }

//     return data;
// }