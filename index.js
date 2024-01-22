const fs = require('fs');
const parser = require('csv-parser')


fs.unlink('canada.txt',  (error) => {
    if (error) throw error
})
fs.unlink('usa.txt',  (error) => {
    if (error) throw error
})

const usaStream = fs.createWriteStream('usa.txt')
const canadaStream = fs.createWriteStream('canada.txt')
const readStream = fs.createReadStream('input_countries.csv')
usaStream.write('country,year,population \n')
canadaStream.write('country,year,population \n')
readStream.pipe(parser()).on('data', (r)=> {
    if (r.country === 'Canada'){
        canadaStream.write(`${r.country},`)
        canadaStream.write(`${r.year},`)
        canadaStream.write(`${r.population}`)
        canadaStream.write("\n")

    }
    if (r.country === 'United States'){
        usaStream.write(`${r.country},`)
        usaStream.write(`${r.year},`)
        usaStream.write(`${r.population}`)
        usaStream.write("\n")

    }
})




