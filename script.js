document.getElementById('htmlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const htmlCode = document.getElementById('htmlInput').value;
    const correctionList = document.getElementById('correctionList');
    const fixedCodeElement = document.getElementById('fixedCode');

    correctionList.innerHTML = '';
    fixedCodeElement.textContent = '';

    const corrections = checkHtmlCode(htmlCode);
    
    if (corrections.length > 0) {
        corrections.forEach(correction => {
            const li = document.createElement('li');
            li.textContent = correction;
            correctionList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No issues found. Your HTML is valid!';
        correctionList.appendChild(li);
    }

    const fixedHtml = fixHtmlCode(htmlCode);
    fixedCodeElement.textContent = fixedHtml;
});

function checkHtmlCode(htmlCode) {
    const issues = [];
    
    if (htmlCode.match(/<([a-zA-Z]+)(?!.*<\/\1>)/)) {
        issues.push('Unclosed or improperly nested tag detected.');
    }
    
    if (htmlCode.includes('<li>') && !htmlCode.includes('</li>')) {
        issues.push('Unclosed <li> tag found.');
    }
    
    
    return issues;
}

function fixHtmlCode(htmlCode) {
    let fixedHtml = htmlCode;

    fixedHtml = fixedHtml.replace(/<li>/g, '<li></li>');
    
    
    return fixedHtml;
}
