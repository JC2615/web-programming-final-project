import {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'itemName', headerName: 'Item Name', width: 130 },
    { field: 'armorType', headerName: 'Type', width: 70 },
    { field: 'rarity', headerName: 'Rarity', type: 'number', width: 70 },
    { field: 'rank', headerName: 'Rank', width: 70 },
    { field: 'defense', headerName: 'Base Defense', width: 130, type: 'number' },
    { 
        field: 'image', 
        headerName: 'Image', 
        width: 130,
        sortable: false,
        renderCell: (params) => (
            params.value ? <img alt= "Armor" src={params.value}/> : ''
        )
    }
];

const rows = [
    { id: 1, itemName: 'Snow Boots', armorType: 'Feet', rarity: 5, rank: "high", defense: 25, image: "https://assets.mhw-db.com/armor/1a9b8f6dca24558371b899e0a676ac96a515c2d5.3a5580210b5c74a93ae4dabc5d48486d.png" },
    { id: 2, itemName: 'Snow Helmet', armorType: 'Head', rarity: 5, rank: "high", defense: 30 },
];

export default function Weapons(){
    const [data, setData] = useState({});

    async function getPic(){
      await fetch('https://mhw-db.com/armor/83')
        .then(response => response.json())
        .then(data => {
            setData(data)
            console.log(data)
        });
    }
  
    useEffect(() => getPic(), [])
    return(
        <div style={{display: "flex", height: "100%"}}>
            <div style={{flex: 1}}>
                <DataGrid autoHeight rows={rows} columns={columns} pageSize={5}/>
            </div>
        </div>
    )
}