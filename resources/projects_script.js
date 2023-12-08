function select(where) {
	if (!where.endsWith(".html")) where += ".html";
	window.location.href = "/views/projects/" + where;
}

function toggleExpand(element) {
	const codeElement = element.parentElement.children[1];
	const titleElement = element.parentElement.children[0];
	//calculates the height of text...
	codeElement.style.setProperty(
		"--height",
		`${parseInt(codeElement.children[0].getBoundingClientRect().height)}px`
	);

	if (codeElement.classList.contains("expanded")) {
		codeElement.classList.add("collapsed");
		codeElement.classList.remove("expanded");
		titleElement.classList.remove("selected");
	} else {
		codeElement.classList.add("expanded");
		titleElement.classList.add("selected");
		codeElement.classList.remove("collapsed");
	}
}
