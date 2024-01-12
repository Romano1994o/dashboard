document.addEventListener("DOMContentLoaded", function () {
	var navItems = document.querySelectorAll(".nav__item");

	navItems.forEach(function (item) {
		item.addEventListener("click", function (event) {
			event.preventDefault();

			navItems.forEach(function (navItem) {
				navItem.classList.remove("current");
			});

			item.classList.add("current");

            window.location.href = item.getAttribute("href");
		});
	});
});
