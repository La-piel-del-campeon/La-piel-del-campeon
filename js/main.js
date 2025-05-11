document.addEventListener("DOMContentLoaded", function () {
    // Función para cargar productos desde localStorage
    function loadProducts(category = 'all') {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const productsGrid = document.querySelector('#productsGrid');
        
        // Limpiar productos existentes
        productsGrid.innerHTML = '';
        
        // Filtrar productos disponibles y por categoría
        const availableProducts = products.filter(product => 
            product.status === 'available' && 
            (category === 'all' || product.category === category)
        );
        
        // Mostrar mensaje si no hay productos
        if (availableProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-500">No hay productos disponibles en esta categoría.</p>
                </div>
            `;
            return;
        }
        
        // Agregar productos al grid
        availableProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300';
            productCard.innerHTML = `
                <div class="h-64 overflow-hidden">
                    <img src="${product.imageUrl}" alt="${product.teamName}" class="w-full h-full object-cover object-top">
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-lg font-semibold">${product.teamName}</h3>
                        <span class="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                            ${product.type}
                        </span>
                    </div>
                    <p class="text-gray-500 text-sm mb-4">${product.season}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-bold">$${product.price}</span>
                        <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fdirect%2Ft%2F17842060017199635%2F%3F__coig_login%3D1" target="_blank" class="buy-button bg-primary text-white px-4 py-2 rounded-button font-medium transition-all whitespace-nowrap !rounded-button">
                            Comprar
                        </a>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }

    // Cargar productos al iniciar la página
    loadProducts();

    // Manejadores para los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Actualizar estilos de los botones
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-white', 'text-secondary');
            });
            this.classList.remove('bg-white', 'text-secondary');
            this.classList.add('bg-primary', 'text-white');
            
            // Cargar productos de la categoría seleccionada
            loadProducts(this.dataset.category);
        });
    });

    // Manejadores para el menú móvil
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const closeMenuButton = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.add("active");
    });
    closeMenuButton.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
    });

    // Manejador del formulario de newsletter
    const newsletterForm = document.querySelector(".newsletter form");
    const newsletterInput = document.querySelector('.newsletter input[type="email"]');
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (newsletterInput.value) {
                const successMessage = document.createElement("div");
                successMessage.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
                successMessage.textContent = "¡Gracias por suscribirte!";
                document.body.appendChild(successMessage);
                newsletterInput.value = "";
                setTimeout(() => successMessage.remove(), 3000);
            }
        });
    }

    // Manejador del formulario de contacto
    const contactForm = document.querySelector("#contacto form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const successMessage = document.createElement("div");
            successMessage.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
            successMessage.textContent = "¡Mensaje enviado con éxito!";
            document.body.appendChild(successMessage);
            this.reset();
            setTimeout(() => successMessage.remove(), 3000);
        });
    }

    // Scroll suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                mobileMenu.classList.remove("active");
            }
        });
    });

    // Manejador del botón "Cargar Más"
    const loadMoreBtn = document.querySelector("#catalogo button:last-child");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function () {
            const loadingMessage = document.createElement("div");
            loadingMessage.className = "fixed top-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50";
            loadingMessage.textContent = "Cargando más productos...";
            document.body.appendChild(loadingMessage);
            setTimeout(() => {
                loadingMessage.remove();
                const noMoreMessage = document.createElement("div");
                noMoreMessage.className = "fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
                noMoreMessage.textContent = "No hay más productos disponibles";
                document.body.appendChild(noMoreMessage);
                setTimeout(() => noMoreMessage.remove(), 3000);
            }, 1500);
        });
    }
}); 