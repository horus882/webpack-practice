import './sass/app.scss'
import './js/app'

if (process.env.NODE_ENV !== 'production') {require('./index.html')}

console.log(process.env.NODE_ENV);

