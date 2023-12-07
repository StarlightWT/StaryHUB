function select(where) {
	if (!where.endsWith(".html")) where += ".html";
	window.location.href = "/views/projects/" + where;
}

function toggleExpand(element) {
	const codeElement = element.parentElement.children[1];
	//calculates the height of text...
	codeElement.style.setProperty(
		"--height",
		`${parseInt(codeElement.children[0].getBoundingClientRect().height)}px`
	);

	if (codeElement.classList.contains("expanded")) {
		codeElement.classList.add("collapsed");
		codeElement.classList.remove("expanded");
	} else {
		codeElement.classList.add("expanded");
		codeElement.classList.remove("collapsed");
	}
}
