// Waits for the entire document (HTML) to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {

    // Selects all <section> elements in the document
    const sections = document.querySelectorAll("section");

    /*
     * Function to handle the scroll effect
     * Determines the current scroll position
     * Checks if a section is visible in the viewport
     * If the section is visible, it adds a "fade-in" class to trigger animations
    */
    function handleScroll() {
        // Get the current vertical scroll position + half of the viewport height
        // Calculates the vertical position of the center of the viewport relative to the entire document. 
        // window.scrollY` gets the pixels scrolled from the top, while `window.innerHeight / 2` finds the middle of the visible screen. 
        // Adding them gives the absolute position of the viewport's center, useful for detecting when elements enter the center of the screen.
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Loop through all sections to check which ones should be animated
        sections.forEach(section => {
            /*
             * Condition Explanation:
             * - `scrollPosition > section.offsetTop`: Checks if the section is within view.
             * - `!section.classList.contains("fade-in")`: Ensures the animation is applied only once.
            */
            if (scrollPosition > section.offsetTop && !section.classList.contains("fade-in")) {
                // Add fade-in animation
                section.classList.add("fade-in");
            }
        });
    }

    /*
     * Optimized scroll event listener (throttling)
     * Uses setTimeout to reduce the number of function calls
     * Improves performance by limiting updates to every 100ms
    */
    let scrollTimeout;
    window.addEventListener("scroll", function () {
        // Clear any previous timeout to prevent unnecessary executions
        clearTimeout(scrollTimeout);
        // Delay execution to avoid excessive function calls
        scrollTimeout = setTimeout(handleScroll, 100);
    });

    /*
     * Smooth scrolling for navigation links
     * Prevents default link behavior
     * Scrolls smoothly to the target section
     */
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevents default jump-to behavior
            e.preventDefault(); 

            // Uses the href attribute of the clicked anchor to find the target section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                // Enables smooth scrolling effect
                behavior: 'smooth' 
            });
        });
    });

    /*
     * Travel icons hover effect
     * Expands icons on hover (scaling effect)
     * Returns them to normal when the mouse leaves
    */
    // Selects all FontAwesome icons
    const travelIcons = document.querySelectorAll('.fas');
    travelIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            // Expands icon by 20%
            icon.style.transform = 'scale(1.2)';
            // Smooth transition effect
            icon.style.transition = 'transform 0.3s ease'; 
        });
        icon.addEventListener('mouseout', () => {
            // Returns to original size
            icon.style.transform = 'scale(1)'; 
        });
    });

});
