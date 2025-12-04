"use strict";


// // Tabs
// const tabs = document.querySelectorAll(".tabs");

// tabs.forEach((tab) => {
//   const links = tab.querySelectorAll(".tabs-nav .tabs-link"),
//     contents = tab.querySelectorAll(".tabs-content");

//   if (!contents) {
//     return;
//   }

//   window.addEventListener("load", function () {
//     for (let i = 0; i < contents.length; i++) {
//       contents[i].classList.add("hide");
//     }

//     for (let i = 0; i < links.length; i++) {
//       links[i].classList.remove("active");
//       links[i].ariaSelected = false;
//     }

//     links[0].classList.add("active");
//     links[0].ariaSelected = true;

//     const dataTarget = links[0].dataset.webTarget,
//       targetElement = this.document.getElementById(dataTarget);

//     targetElement.classList.remove("hide");
//   });

//   links.forEach((link) => {
//     const dataTarget = link.dataset.webTarget,
//       targetElement = document.getElementById(dataTarget);

//     if (targetElement) {
//       link.addEventListener("click", function () {
//         for (let i = 0; i < contents.length; i++) {
//           contents[i].classList.add("hide");
//         }

//         for (let i = 0; i < links.length; i++) {
//           links[i].classList.remove("active");
//           links[i].ariaSelected = false;
//         }

//         link.classList.add("active");
//         link.ariaSelected = true;
//         targetElement.classList.remove("hide");
//       });
//     } else {
//       link.disabled = true;
//     }
//   });
// });

// // Portfolio filter
// const portfolioFilters = document.querySelectorAll(".portfolio-menu button");

// portfolioFilters.forEach((filter) => {
//   filter.addEventListener("click", function () {
//     let btn = portfolioFilters[0];

//     while (btn) {
//       if (btn.tagName === "BUTTON") {
//         btn.classList.remove("active");
//       }

//       btn = btn.nextSibling;
//     }

//     this.classList.add("active");

//     let selected = filter.getAttribute("data-filter"),
//       itemsToHide = document.querySelectorAll(
//         '.portfolio-grid .portfolio :not([data-filter="' + selected + '"])'
//       ),
//       itemsToShow = document.querySelectorAll(
//         '.portfolio-grid .portfolio [data-filter="' + selected + '"]'
//       );

//     if (selected == "all") {
//       itemsToHide = [];
//       itemsToShow = document.querySelectorAll(
//         ".portfolio-grid .portfolio [data-filter]"
//       );
//     }

//     itemsToHide.forEach((el) => {
//       el.parentElement.classList.add("hide");
//       el.parentElement.classList.remove("show");
//     });

//     itemsToShow.forEach((el) => {
//       el.parentElement.classList.remove("hide");
//       el.parentElement.classList.add("show");
//     });
//   });
// });

// Scroll to top
var st = document.querySelector("[data-web-trigger=scroll-top]");

if (st) {
  window.onscroll = function () {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      st.classList.remove("is-hided");
    } else {
      st.classList.add("is-hided");
    }
  };

  st.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}