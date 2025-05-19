const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

//POST/complaints
app.post('/complaints', async (req, res) => {
  const { name, email, complaint } = req.body;

  if (!name || !email || !complaint) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const { data, error } = await supabase
    .from('complaints')
    .insert([{ name, email, complaint }]);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: 'Complaint submitted successfully', data });
});


//GET /complaint
app.get('/complaints', async (req, res) => {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

//PATCH /complaints/:id

app.patch('/complaints/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || (status !== 'Pending' && status !== 'Resolved')) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const { data, error } = await supabase
    .from('complaints')
    .update({ status })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'Status updated', data });
});

//DELETE /complaints/:id
app.delete('/complaints/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('complaints')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'Complaint deleted', data });
});

app.listen(5000, () => {
  console.log('Server is listening on http://localhost:5000');
});
