// Check the component is in view port
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Visitor calculation
function checkVisitor() {
  const guestTotal = document.querySelector("#guest-number")
  const apiURL =
    "https://zybyt0ugh6.execute-api.us-east-1.amazonaws.com/Prod/visitors"
  // Make a GET request
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      guestTotal.innerHTML = data.total
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

document.addEventListener("DOMContentLoaded", function () {
  checkVisitor()
  // Stick the section name into sticky top nav bar
  window.onscroll = function () {
    const stickyElements = document.querySelectorAll(".title")

    stickyElements.forEach(function (element) {
      const rect = element.getBoundingClientRect()

      if (rect.top <= 0 && rect.bottom >= 0) {
        element.classList.add("sticky")
      } else {
        element.classList.remove("sticky")
      }
    })

    // Get all links with href starting with "#"
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      const targetId = link.getAttribute("href").substring(1) // Remove the "#" from the href
      const targetElement = document.getElementById(targetId)
      if (targetElement && isInViewport(targetElement)) {
        // Add a class to the link when the corresponding section is in the viewport
        link.classList.add("active")
      } else {
        // Remove the class if the section is not in the viewport
        link.classList.remove("active")
      }
    })
  }
})
