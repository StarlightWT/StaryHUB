function redirect(where) {
	switch (where) {
		case "home":
			where = "/index.html";
			break;
		case "projects":
			where = "/views/projects.html";
			break;
		case "discord":
			where = "https://discord.gg/bT8mdZkKGF";
			break;
		case "github":
			where = "https://github.com/StarlightWT";
			break;
		case "support":
			where = "https://ko-fi.com/starevelyn";
			break;
	}
	window.location.href = where;
}

const repNav = document.getElementById("replace_nav");
fetch("/resources/nav.html").then(async (nav) => {
	var newBar = document.createElement("nav");
	newBar.className = "dash";
	newBar.innerHTML = await nav.text();
	repNav.replaceWith(newBar);
	document.body.scrollTop = document.documentElement.scrollTop = 0; //Scroll to the top so new bar is visible
});
