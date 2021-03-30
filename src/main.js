import './sass/app.scss'
import './js/app'

import './img/index/picture.jpg'

if (process.env.NODE_ENV !== 'production') {require('./index.html')}

console.log(process.env.NODE_ENV);
console.log(__dirname);
