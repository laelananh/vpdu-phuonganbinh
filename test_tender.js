const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'd:\\Antigravity\\vpduPhuongAnBinh\\.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

(async () => {
  console.log("Inserting tender...");
  const insertPayload = {
    code: 'TEST-123',
    title: 'Test Tender',
    budget: '100',
    investor: 'Test',
    status: 'Test',
    field: 'Test',
    deadline: new Date().toISOString(),
    published_at: new Date().toISOString(),
    content: 'Test content'
  };
  
  const { data: inserted, error: insertErr } = await supabase.from('tenders').insert([insertPayload]).select();
  console.log("Insert error:", insertErr?.message || null);
  console.log("Inserted data:", inserted);

  console.log("\nFetching all tenders...");
  const { data: fetched, error: fetchErr } = await supabase.from('tenders').select('*').order('id', { ascending: false });
  console.log("Fetch error:", fetchErr?.message || null);
  console.log(`Fetched ${fetched ? fetched.length : 0} tenders.`);
  if (fetched && fetched.length > 0) {
    console.log("Latest tender id:", fetched[0].id, "title:", fetched[0].title);
  }
})();
