// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Define API URL 
    const apiUrl = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Create the main container
    const container = document.createElement("div");
    container.style.width = "75%";
    container.style.margin = "20px auto";
    container.style.fontFamily = "Arial, sans-serif";

    // Create header
    const header = document.createElement("h1");
    header.textContent = "Bunu da Beğenebilirsiniz";
    header.style.textAlign = "center";
    container.appendChild(header);

    // Create carousel container 
    const carouselContainer = document.createElement("div");
    carouselContainer.style.display = "flex";
    carouselContainer.style.alignItems = "center";
    carouselContainer.style.overflow = "hidden";
    carouselContainer.style.position = "relative";
    container.appendChild(carouselContainer);




    // Create left button 
    const leftBtn = document.createElement("button");
    leftBtn.textContent = "←";
    leftBtn.style.position = "absolute";
    leftBtn.style.left = "10px";
    leftBtn.style.zIndex = "1";
    leftBtn.style.cursor = "pointer";
    leftBtn.style.padding = "10px";
    carouselContainer.appendChild(leftBtn);

    // Create carousel items container
    const carouselItems = document.createElement("div");
    carouselItems.style.display = "flex";

    carouselItems.style.overflowX = "scroll";
    carouselContainer.appendChild(carouselItems);
    carouselItems.style.scrollBehavior = "smooth";
    carouselItems.style.webkitOverflowScrolling = "touch";
    carouselItems.style.scrollbarWidth = "none";
    carouselItems.style.msOverflowStyle = "none";
    const style = document.createElement('style');
    style.innerHTML = ` #${carouselItems.id}::-webkit-scrollbar { display: none; } `;
    document.head.appendChild(style);




    // Create right button 
    const rightBtn = document.createElement("button");
    rightBtn.textContent = "→";
    rightBtn.style.position = "absolute";
    rightBtn.style.right = "10px";
    rightBtn.style.zIndex = "1";
    rightBtn.style.cursor = "pointer";
    rightBtn.style.padding = "10px";
    carouselContainer.appendChild(rightBtn);
               
               
            
   style.innerHTML = 
   ` #carouselItems {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
}

#carouselItems::-webkit-scrollbar {
    display: none;
}

#carouselItems>div {
    flex: 0 0 auto;
    min-width: 200px;
    max-width: 300px;
    margin: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    #carouselItems>div {
        min-width: 150px;
        /* Smaller items on mobile */
    }

    button {
        font-size: 14px;
        /* Smaller button text */
        padding: 8px;
        /* Reduce padding */
    }
}

@media (max-width: 480px) {
    #carouselItems>div {
        min-width: 120px;
        /* Compact for smaller screens */
    }
}

`;
document.head.appendChild(style);

// Load products from API
fetch(apiUrl).then(response => response.json()).then(products => {
    products.forEach(product => {
        const item = document.createElement("div");
        item.style.minWidth = "200px";
        item.style.margin = "10px";
        item.style.backgroundColor = "#fff";
        item.style.textAlign = "center";
        item.style.borderRadius = "5px";
        item.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        item.style.position = "relative";
        item.style.cursor = "pointer";
        const img = document.createElement("img");
        img.src = product.img;
        img.style.width = "100%";
        img.style.borderRadius = "5px 5px 0 0";
        item.appendChild(img);
        const name = document.createElement("h4");
        name.textContent = product.name;
        name.style.fontWeight = "normal";
        item.appendChild(name);
        const price = document.createElement("p");
        price.textContent = `${product.price} TRY`;
        price.style.color = "blue";
        price.style.fontWeight = "bold";
        item.appendChild(price);
        const heartIcon = document.createElement("div");
        heartIcon.textContent = "♥";
        heartIcon.style.position = "absolute";
        heartIcon.style.top = "10px";
        heartIcon.style.right = "10px";
        heartIcon.style.cursor = "pointer";
        heartIcon.style.color = favorites.some(f => f.id === product.id) ? "blue" : "grey";
        item.appendChild(heartIcon); // Add to favorites 


        heartIcon.addEventListener("click", function(event) {
            event.stopPropagation();
            if (favorites.some(f => f.id === product.id)) {
                const index = favorites.findIndex(f => f.id === product.id);
                favorites.splice(index, 1);
                heartIcon.style.color = "grey";
            } else {
                favorites.push(product);
                heartIcon.style.color = "blue";
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
        // Open product details on click
        item.addEventListener("click", () => {
            window.open(product.url || "#", "_blank");
        });

        carouselItems.appendChild(item);
    });
});




// Left and right button functionality
leftBtn.addEventListener("click", () => {
    carouselItems.scrollLeft -= 200;
});
rightBtn.addEventListener("click", () => {
    carouselItems.scrollLeft += 200;
}); // Append container to body 
document.body.appendChild(container);
});