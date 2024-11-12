const bcrypt = require('bcrypt');

bcrypt.hash('Abc@12345', 10, (err, hash) => {
    if (err) throw err;
    console.log('Generated hash:', hash);
});
