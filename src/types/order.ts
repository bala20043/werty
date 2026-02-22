export interface Order {
    id: string;
    client_name: string;
    phone: string;
    email: string;
    service: string;
    budget: string;
    timeline: string;
    description: string;
    status: 'pending' | 'in_progress' | 'finished';
    created_at: string;
}
