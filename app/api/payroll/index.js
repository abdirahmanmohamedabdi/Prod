import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('payroll').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { employee_id, pay_date, amount } = req.body;
    const { data, error } = await supabase.from('payroll').insert([{ employee_id, pay_date, amount }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }
}