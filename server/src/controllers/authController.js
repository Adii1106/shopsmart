let users = [
  { id: 1, name: 'Aditya', email: 'adi@test.com', password: '123', city: 'Pune', role: 'seller' }
];

exports.register = (req, res) => {
  const { name, email, password, city, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: 'Missing info' });
  
  const newUser = { id: users.length + 1, name, email, password, city, role: role || 'buyer' };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ msg: 'Invalid credentials' });
  res.json(user);
};
