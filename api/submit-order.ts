import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
    // 1. Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const {
        client_name,
        phone,
        email,
        service,
        budget,
        timeline,
        description,
        status
    } = req.body

    // 2. Validate environment variables (Server-side)
    // We trim them to prevent errors caused by accidental spaces/newlines in Vercel dashboard
    const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL)?.trim()
    const supabaseKey = (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)?.trim()

    if (!supabaseUrl || !supabaseKey) {
        console.error('SERVER CONFIG ERROR: Missing Supabase URL or Key')
        return res.status(500).json({ error: 'Supabase configuration missing on server.' })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    try {
        // 3. Forward the insert to Supabase
        const { data, error } = await supabase
            .from('orders')
            .insert([
                {
                    client_name,
                    phone,
                    email,
                    service,
                    budget,
                    timeline,
                    description,
                    status: status || 'pending'
                }
            ])

        if (error) throw error

        // 4. Return success
        return res.status(200).json({ message: 'Order submitted successfully', data })
    } catch (error: any) {
        console.error('Proxy Error:', error.message)

        // Extract deep cause for tracking down "fetch failed" in Node 18+
        let causeMessage = 'No explicit cause';
        if (error.cause) {
            causeMessage = error.cause.message || JSON.stringify(error.cause);
        }

        return res.status(500).json({
            error: 'Failed to submit order to database.',
            details: error.message,
            cause: causeMessage,
            stack: error.stack
        })
    }
}
