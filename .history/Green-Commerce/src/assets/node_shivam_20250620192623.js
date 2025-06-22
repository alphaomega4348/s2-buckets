// const fs = require(‘fs’);
// const csv = require(‘csv-parser’);
// const createCsvWriter = require(‘csv-writer’).createObjectCsvWriter;

// const inputFile = ‘filled_amazon_dataset_final.csv’;
// const outputFile = ‘scored_dataset.csv’;

// const results = [];

// fs.createReadStream(inputFile)
// .pipe(csv())
// .on(‘data’, (row) => {
// const parsedRow = processRow(row);
// results.push(parsedRow);
// })
// .on(‘end’, () => {
// writeResults(results);
// console.log(‘Eco scoring completed. Output written to scored_dataset.csv’);
// });

// function processRow(row) {
// // Convert strings to numbers
// const plasticUsed = parseFloat(row.plastic_used_g || 0);
// const baselinePlastic = parseFloat(row.baseline_plastic_g || 1);
// const chemicalUsed = parseFloat(row.chemical_used_g || 0);
// const baselineChemical = parseFloat(row.baseline_chemical_g || 1);
// const co2Emission = parseFloat(row.co2_emission_kg || 0);
// const baselineCo2 = parseFloat(row.baseline_co2_kg || 1);
// const biodegradablePercent = parseFloat(row.biodegradable_percent || 0);

// const plasticReducedPercent = ((baselinePlastic - plasticUsed) / baselinePlastic) * 100;
// const chemicalUsedPercent = (chemicalUsed / baselineChemical) * 100;
// const co2ReducedPercent = ((baselineCo2 - co2Emission) / baselineCo2) * 100;

// // Normalized Scores
// const plasticScore = plasticReducedPercent / 100;
// const chemicalScore = (100 - chemicalUsedPercent) / 100;
// const co2Score = co2ReducedPercent / 100;
// const bioScore = biodegradablePercent / 100;

// // Recyclability Mapping
// const recyclableMap = {
// ‘Fully recyclable’: 1,
// ‘Partially recyclable’: 0.5,
// ‘Not recyclable’: 0,
// };
// const recyclableScore = recyclableMap[row.recyclability_level] || 0;

// // Final Weighted Score
// const ecoScore =
// 0.25 * plasticScore +
// 0.25 * co2Score +
// 0.15 * chemicalScore +
// 0.15 * recyclableScore +
// 0.2 * bioScore;

// const leafScore = Math.round(ecoScore * 5);

// return {
// …row,
// plastic_reduced_percent: plasticReducedPercent.toFixed(2),
// chemical_used_percent: chemicalUsedPercent.toFixed(2),
// co2_emission_reduced_percent: co2ReducedPercent.toFixed(2),
// leaf_score_computed: ecoScore.toFixed(2),
// leaf_score_final: leafScore
// };
// }

// function writeResults(data) {
// const headers = Object.keys(data[0]).map((key) => ({ id: key, title: key }));

// const csvWriter = createCsvWriter({
// path: outputFile,
// header: headers,
// });

// csvWriter.writeRecords(data);
// }

// 📤 Output:
// 	•	scored_dataset.csv — contains all original columns plus:
// 	•	plastic_reduced_percent
// 	•	chemical_used_percent
// 	•	co2_emission_reduced_percent
// 	•	leaf_score_computed
// 	•	leaf_score_final (1–5)
