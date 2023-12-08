//JS keywords start
const purpleKeywords = [
	"function",
	"delete",
	"return",
	"const",
	"let",
	"var",
	"if",
	"switch",
	"case",
	"break",
	"else",
	"for",
];

const blueKeywords = ["log", "append", "push", "from", "reload"];
const yellowKeywords = ["console", "document", "classList", "location"];
const redKeywords = ["innerHTML", "textContent"];
const orangeKeywords = ["null"];
//JS keywords end

//C keywords start
const purpleCKeywords = [
	"\\#include",
	"int",
	"char",
	"\\*",
	"void",
	"int",
	"if",
	"\\(",
	"\\)",
	"case",
	"break;",
	"else",
	"do",
	"return",
];
//C keywords end
function highlight() {
	const elementsSearch = document.getElementsByTagName("code");
	const elements = Array.from(elementsSearch);
	let regexs = [];
	let variables = [];
	let constants = [];
	elements.forEach((element) => {
		const text = element.textContent;
		const children = Array.from(element.parentElement.parentElement.children);
		const language = children[0].textContent.split(".")[1];

		let vars = text.match(/\b(?:var|let)\s+(\w+)\s*=/g);
		text
			.match(/\b(?:var|let)\s+(\w+)\s*;/g)
			?.forEach((match) => vars.push(match));
		vars?.forEach((word) => {
			variables.push(word.split(" ")[1]);
		});

		let consts = text.match(/\bconst\s+(\w+)\s*=/g);
		text.match(/\bconst\s+(\w+)\s*=/g)?.forEach((match) => consts.push(match));
		consts?.forEach((word) => {
			constants.push(word.split(" ")[1]);
		});

		switch (language) {
			case "js":
				regexs.push(
					{
						//Variables with =
						regex: /\b(?:var|let)\s+(\w+)\s*=/g,
						span: 'var <span class="red">$1</span> =',
					},
					{
						//Variables with ;
						regex: /\b(?:var|let)\s+(\w+)\s*;/g,
						span: 'var <span class="red">$1</span>;',
					},
					{
						//Consts with =
						regex: /\bconst\s+(\w+)\s*=/g,
						span: 'const <span class="yellow">$1</span> =',
					},
					{
						//Variables with ;
						regex: /\bconst\s+(\w+)\s*;/g,
						span: 'const <span class="yellow">$1</span>;',
					},
					{
						//Comment regex
						regex: /\/\/(.*$)/gm,
						span: '<span class="gray">//$1</span>',
					},
					{
						//Function regex
						regex: /function\s+(\w+)\s*\((.*)\)/g,
						span: 'function <span class="blue">$1</span>($2)',
					},
					{
						//Case regex
						regex: /case\s+(.+)\s*:$/gm,
						span: 'case <span class="green">$1</span>:',
					},
					{
						//Purple preset regex
						regex: `\\b(?:(${purpleKeywords.join("|")}))\\b`,
						span: '<span class="purple">$1</span>',
					},
					{
						//Red preset regex
						regex: `(?:(${redKeywords.join("|")}))`,
						span: '<span class="red">$1</span>',
					},
					{
						//Red variables regex
						regex: `\\b(?:(${variables.join("|")}))\\b`,
						span: '<span class="red">$1</span>',
					},
					{
						//Yellow consts regex
						regex: `\\b(?:(${constants.join("|")}))\\b`,
						span: '<span class="yellow">$1</span>',
					},
					{
						//Yellow preset regex
						regex: `(?:(${yellowKeywords.join("|")}))`,
						span: '<span class="yellow">$1</span>',
					},
					{
						//Blue preset regex
						regex: `(?:(${blueKeywords.join("|")}))`,
						span: '<span class="blue">$1</span>',
					},
					{
						//Orange preset regex
						regex: `(?:(${orangeKeywords.join("|")}))`,
						span: '<span class="orange">$1</span>',
					}
				);
				break;
			case "c":
				regexs.push(
					{
						regex: /"([^"]*)"/,
						span: '<span class="green">"$1"</span>',
					},
					{
						regex: /(\s+)([a-zA-Z_]\w*)\s*\(/,
						span: '$1<span class="blue">$2</span>(',
					},
					{
						regex: `(?:(${purpleCKeywords.join("|")}))`,
						span: '<span class="purple">$1</span>',
					}
				);
				break;
		}

		let newText = text;

		regexs.forEach((regex) => {
			newText = newText.replace(RegExp(regex.regex, "gm"), regex.span);
		});
		console.log(newText);
		element.innerHTML = newText;
		const spanElements = document.querySelectorAll("span");
		spanElements.forEach((span) => {
			if (span.parentNode.tagName === "SPAN") {
				span.classList.forEach((clas) => span.classList.remove(clas));
			}
		});
	});
}

highlight();
