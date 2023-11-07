function addFile(){
    n = document.getElementById('fileCont').children;
    console.log(n)
    console.log(n.length);
    tf = document.createElement('input');
    tf.setAttribute('type', 'file');
    tf.setAttribute('id', 'file'+ (n.length+=1));
    document.getElementById('fileCont').appendChild(tf);
};

function readFileAsync(file) {
    
    return new Promise((resolve, reject) => {
    let reader = new FileReader(); 
    reader.onload = async () => {
        resolve(reader.result);
    }; 
    reader.onerror = reject; 
    reader.readAsArrayBuffer(file);
    })
};

function download(file, filename, type) {
    const link = document.getElementById('link');
    link.download = filename;
    let binaryData = [];
    binaryData.push(file);
    link.href = URL.createObjectURL(new Blob(binaryData, {type: type}));
    link.style.display = "block"
};

async function merge() {
    let PDFDocument = PDFLib.PDFDocument;
    let tf = document.getElementById('fileCont').children;
    let mergedPdf = await PDFDocument.create(); 
    for (let i = 1; i < (tf.length + 1); i++) {
        let inp0 = await document.getElementById('file'+i).files[0];
        let byt0 = await readFileAsync(inp0);
        let pdf0 = await PDFDocument.load(byt0);
        let tmp0 = await mergedPdf.copyPages(pdf0, pdf0.getPageIndices());
        tmp0.forEach((page) => mergedPdf.addPage(page)); 
    };
    let mergedPdfFile = await mergedPdf.save();
    download(mergedPdfFile, 'merged-pdf.pdf', 'application/pdf');
};