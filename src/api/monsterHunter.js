fetch('https://mhw-db.com/armor/leather')
    .then(response => response.json())
    .then(armor => {
        console.log(armor);
    });