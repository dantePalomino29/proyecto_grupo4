import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://witchol1704:Holasoygerman1@cluster0.me5yego.mongodb.net/bd_proyectoFinal?retryWrites=true&w=majority')
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Error en Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default mongoose;