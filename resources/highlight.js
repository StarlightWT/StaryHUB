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

const blueKeywords = ["log", "append", "push", "from"];
const yellowKeywords = ["console", "document", "classList"];
const redKeywords = ["innerHTML", "textContent"];
function highlight() {
	const elementsSearch = document.getElementsByTagName("code");
	const elements = Array.from(elementsSearch);

	elements.forEach((element) => {
		let variables = [];
		const text = element.textContent;

		const purpleRegex = new RegExp(
			`\\b(?:(${purpleKeywords.join("|")}))\\b`,
			"g"
		);
		const yellowRegex = new RegExp(`(?:(${yellowKeywords.join("|")}))`, "g");
		const blueRegex = new RegExp(`(?:(${blueKeywords.join("|")}))`, "g");
		const redPresetRegex = new RegExp(`(?:(${redKeywords.join("|")}))`, "g");

		const orangeRegex = /\b(null)\b/g;

		const redRegex = /\b(?:var|let)\s+(\w+)\s*=/g;
		text.match(redRegex).forEach((word) => {
			variables.push(word.split(" ")[1]);
		});

		const secondaryRedRegex = /\b(?:var|let)\s+(\w+)\s*;/g;
		const thirdRedRegex = new RegExp(`\\b(?:(${variables.join("|")}))\\b`, "g");

		const functionRegex = /function\s+(\w+)\s*\((.*)\)/g;
		const commentRegex = /\/\/(.*$)/gm;
		const greenRegex = /case\s+(.+)\s*:$/gm;

		// super cool gray
		let newText = text
			.replace(greenRegex, 'case <span class="green">$1</span>:')
			.replace(redRegex, 'var <span class="red">$1</span> =')
			.replace(secondaryRedRegex, 'var <span class="red">$1</span>;')
			.replace(functionRegex, 'function <span class="blue">$1</span>($2)')
			.replace(yellowRegex, '<span class="yellow">$1</span>')
			.replace(redPresetRegex, '<span class="red">$1</span>')
			.replace(blueRegex, '<span class="blue">$1</span>')
			.replace(orangeRegex, '<span class="orange">$1</span>')
			.replace(thirdRedRegex, '<span class="red">$1</span>')
			.replace(commentRegex, '<span class="gray">//$1</span>')
			.replace(purpleRegex, '<span class="purple">$1</span>');

		element.innerHTML = newText;
		const spanElements = document.querySelectorAll("span");
		// Iterate over each span element
		spanElements.forEach((span) => {
			// Check if the current span has a parent span
			if (span.parentNode.tagName === "SPAN") {
				// Remove the current span from its parent
				span.classList.forEach((clas) => span.classList.remove(clas));
			}
		});
	});
}

highlight();
