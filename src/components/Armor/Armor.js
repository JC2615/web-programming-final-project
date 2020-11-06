import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const noPicURL = "https://cdn3.iconfinder.com/data/icons/abstract-1/512/no_image-512.png";

const columns = [
    { field: 'id', headerName: 'ID', width: 70, align: "center", headerAlign: 'center' },
    { field: 'itemName', headerName: 'Item Name', width: 250, align: "center", headerAlign: 'center' },
    { field: 'armorType', headerName: 'Type', width: 80, align: "center", headerAlign: 'center' },
    { field: 'rank', headerName: 'Rank', width: 70, align: "center", headerAlign: 'center' },
    { field: 'rarity', headerName: 'Rarity', type: 'number', width: 70, align: "center", headerAlign: 'center' },
    { field: 'defense', headerName: 'Base Defense', width: 130, type: 'number', align: "center", headerAlign: 'center' },
    {
        field: 'image',
        headerName: 'Image',
        width: 75,
        sortable: false,
        renderCell: (params) => (
            params.value !== null ? <img height={60} alt="Armor" src={params.value} /> : <img height={40} alt="Armor" src={noPicURL} />
        )
    }
];

export default function Armor() {
    const [dataToDisplay, setDataToDisplay] = useState('all');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    function handleRadioChange(event) {
        setDataToDisplay(event.target.value);
        getArmor(event.target.value);
    }

    function getArmor(armorType = 'all') {
        const tempRows = [];
        setLoading(true);
        fetch('https://mhw-db.com/armor/')
            .then(response => response.json())
            .then(d => {

                for (let i = 0; i < d.length; i++) {
                    if (armorType === 'all') {
                        tempRows.push({
                            id: d[i].id,
                            itemName: d[i].name,
                            armorType: d[i].type,
                            rarity: d[i].rarity,
                            rank: d[i].rank,
                            defense: d[i].defense.base,
                            image: d[i].assets ? d[i].assets.imageMale : null
                        });
                    }
                    else if (d[i].type === armorType) {
                        tempRows.push({
                            id: d[i].id,
                            itemName: d[i].name,
                            armorType: d[i].type,
                            rarity: d[i].rarity,
                            rank: d[i].rank,
                            defense: d[i].defense.base,
                            image: d[i].assets ? d[i].assets.imageMale : null
                        });
                    }

                }
                setRows(tempRows);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })

    };

    useEffect(() => {
        getArmor(dataToDisplay);
    }, [])

    return (
        <div style={{ display: "flex", height: "100vh", width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
            <div style={{ height: "70%", width: 760 }}>
                <DataGrid
                    rowsPerPageOptions={[5, 10, 15]}
                    pageSize={10}
                    autoHeight
                    autoPageSize
                    loading={loading}
                    hideFooterSelectedRowCount
                    rows={rows}
                    columns={columns} />
            </div>
            <div style={{ height: "35%" }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Armor Type</FormLabel>
                    <RadioGroup name="armor_type" value={dataToDisplay} onChange={handleRadioChange}>
                        <FormControlLabel value="head" control={<Radio color="primary" />} label="Head" />
                        <FormControlLabel value="chest" control={<Radio color="primary" />} label="Chest" />
                        <FormControlLabel value="gloves" control={<Radio color="primary" />} label="Gloves" />
                        <FormControlLabel value="waist" control={<Radio color="primary" />} label="Waist" />
                        <FormControlLabel value="legs" control={<Radio color="primary" />} label="Legs" />
                        <FormControlLabel value="all" control={<Radio color="primary" />} label="All" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}