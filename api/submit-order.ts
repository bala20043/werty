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
    const supabaseUrl = process.env.VITE_SUPABASE_URL
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
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
    } catch (error) {
        console.error('Proxy Error:', error.message)
        return res.status(500).json({
            error: 'Failed to submit order to database.',
            details: error.message
        })
    }
}
