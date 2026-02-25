const url = "https://hxylrtpixfnudazuwzhp.supabase.co/rest/v1/orders?select=*&limit=1";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWxydHBpeGZudWRhenV3emhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTgwMjYsImV4cCI6MjA4NzU3NDAyNn0.o3QGM_V8ZpHUI2s0S7cYG45iZ6iQ71pGvmSr8ZHFdbA";

console.log("Attempting to connect to:", url);

fetch(url, {
    headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`
    }
}).then(res => {
    console.log("Status:", res.status);
    return res.json();
}).then(data => {
    console.log("Data:", data);
}).catch(err => {
    console.error("Connection Failed!");
    console.error(err.message);
    if (err.cause) console.error("Cause:", err.cause.message);
});
