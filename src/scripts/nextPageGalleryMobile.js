window.addEventListener('scroll', async () => {
    const counter = await fishCardsCounter(); // Call the asynchronous fishCardsCounter() function
    const url = window.location.href;
    if (window.innerWidth < 768) { // Check if the window width is less than 768px (mobile device)

        if (window.scrollY > 500) { // Check if the scrollY is greater than 500px
            if (url.includes('fishes_')) {
                numberPage = +window.location.href.split('fishes_')[1].replace(/[^0-9]+/g, "");
                if (numberPage < counter) {
                    numberPage++;
                    location.href = `./fishes_${numberPage}.html`;
                }
            }

        } else if (window.scrollY < 100) { // Check if the scrollY is less than 100px
            if (url.includes('fishes_')) {
                numberPage = +window.location.href.split('fishes_')[1].replace(/[^0-9]+/g, "");
                if (numberPage) {
                    numberPage--;
                    if (numberPage >= 1) {
                        location.href = `./fishes_${numberPage}.html`;
                    }

                }
            }
        }
    }
});