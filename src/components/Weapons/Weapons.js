import { Card, CardHeader, CardMedia, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';

const noPicURL = "https://cdn3.iconfinder.com/data/icons/abstract-1/512/no_image-512.png";
const loadingImageURL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wpfaster.org%2Fwp-content%2Fuploads%2F2013%2F06%2Floading-gif.gif&f=1&nofb=1";

export default function Weapons() {
    const [weapons, setWeapons] = useState(null);
    const [randNum, setRandNum] = useState(getRandomNum(1299));

    function getWeapons() {
        let temp = [];
        fetch('https://mhw-db.com/weapons/')
            .then(response => response.json())
            .then(d => {
                temp = d;
                setWeapons(temp);
            })
            .catch(err => {
                console.log(err)
            })

    };

    function getRandomNum(max) {
        return Math.floor((Math.random() * (max + 1)));
    }

    useEffect(() => {
        getWeapons();
    }, [])

    return (
        <div style={{ display: "flex", height: "100vh", width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Card style={{ maxWidth: 300 }}>
                <CardHeader
                    title={weapons ? weapons[randNum].name : "Loading..."}
                    subheader={weapons ? weapons[randNum].type : "Loading..."}
                    avatar={<img alt="weapon icon" height={60} src={weapons ? (weapons[randNum].assets ? weapons[randNum].assets.icon : noPicURL) : loadingImageURL} />}
                />
                <CardMedia
                    style={{ height: 200, width: 200 }}
                    image={weapons ? (weapons[randNum].assets ? weapons[randNum].assets.image : noPicURL) : loadingImageURL}
                    title="Weapon"
                />
            </Card>
            <Button style={{ marginTop: 30 }} variant="contained" color="secondary" onClick={() => setRandNum(getRandomNum(weapons.length))}>
                Random Weapon
            </Button>
        </div>
    )
}