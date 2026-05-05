<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FLUX | Fashion House</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="side-menu" id="sideMenu">
        <i class="fa-solid fa-xmark close-menu" id="closeBtn"></i>
        <ul>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Archive</a></li>
            <li><a href="#">Atelier</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </div>

    <header id="mainHeader">
        <div class="top-nav">
            <div class="nav-left">
                <i class="fa-solid fa-bars hamburger" id="menuBtn"></i>
            </div>
            <div class="nav-center">
                <h1 class="logo">FLUX</h1>
            </div>
            <div class="nav-right">
                <i class="fa-solid fa-bag-shopping cart"></i>
            </div>
        </div>
        
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search the house...">
            <i class="fa-solid fa-magnifying-glass search-icon" id="searchBtn"></i>
        </div>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h2>FLUX ATELIER '26</h2>
            <button>View Campaign</button>
        </div>
    </section>

    <section class="collections">
        <h3>The Collections</h3>
        <div class="collection-grid">
            <div class="item item-1">Ready to Wear</div>
            <div class="item item-2">Accessories</div>
            <div class="item item-3">Footwear</div>
        </div>
    </section>

    <footer>
        <div class="footer-logo">FLUX</div>
        <div class="social-icons">
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-tiktok"></i></a>
            <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
        </div>
        <p class="copyright">&copy; 2026 FLUX FASHION HOUSE. ALL RIGHTS RESERVED.</p>
    </footer>

    <a href="https://wa.me/yournumber" class="whatsapp-float" target="_blank">
        <i class="fa-brands fa-whatsapp"></i>
    </a>

    <script src="script.js"></script>
</body>
</html>
