const fs = require('fs');

function mergeFilesProgressively(file1Name, file2Name, file3Name, outputName) {
  const lines1 = fs.readFileSync(file1Name, 'utf-8').split(/\r?\n/);
  const lines2 = fs.readFileSync(file2Name, 'utf-8').split(/\r?\n/);
  const lines3 = fs.readFileSync(file3Name, 'utf-8').split(/\r?\n/);

  if (lines1[lines1.length - 1] === '') lines1.pop();
  if (lines2[lines2.length - 1] === '') lines2.pop();
  if (lines3[lines3.length - 1] === '') lines3.pop();

  const resultLines = [];
  let index1 = 0,
    index2 = 0,
    index3 = 0;
  let linesToCopy = 1;

  while (
    index1 < lines1.length ||
    index2 < lines2.length ||
    index3 < lines3.length
  ) {
    for (
      let count = 0;
      count < linesToCopy && index1 < lines1.length;
      count++
    ) {
      resultLines.push(lines1[index1++]);
    }

    for (
      let count = 0;
      count < linesToCopy && index2 < lines2.length;
      count++
    ) {
      resultLines.push(lines2[index2++]);
    }

    for (
      let count = 0;
      count < linesToCopy && index3 < lines3.length;
      count++
    ) {
      resultLines.push(lines3[index3++]);
    }

    linesToCopy++;
  }

  fs.writeFileSync(outputName, resultLines.join('\n') + '\n', 'utf-8');
  console.log(`Successfully merged into ${outputName}`);
}

const file1 = '1.txt';
const file2 = '2.txt';
const file3 = '3.txt';
const outputFile = 'output.txt';

// Run the function
mergeFilesProgressively(file1, file2, file3, outputFile);
