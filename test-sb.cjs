const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

console.log("URL:", url);
console.log("KEY exists:", !!key);

const supabase = createClient(url, key);

async function test() {
    console.log("Fetching orders from node...");
    try {
        const { data, error } = await supabase.from('orders').select('*').limit(1);
        if (error) {
            console.error("Supabase Error:", error);
        } else {
            console.log("Success, data:", data);
        }
    } catch (e) {
        console.error("Caught Exception:", e);
    }
}

test();
