const Globals = {}
Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? [];
Globals.$words = JSON.parse(localStorage.getItem('words')) ?? [];
Globals.$songs = JSON.parse(localStorage.getItem('songs')) ?? [];

console.log(Globals)

export default Globals;