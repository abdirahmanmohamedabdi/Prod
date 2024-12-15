import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { firstName, secondName, email, phone, role, salary, dob, emergencyContact, gender, employeeId } = req.body;
    const { data, error } = await supabase.from('employees').insert([{ firstName, secondName, email, phone, role, salary, dob, emergencyContact, gender, employeeId }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }
}