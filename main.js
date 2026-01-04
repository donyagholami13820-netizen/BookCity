const mobileMenu = document.getElementById("mobileMenu");
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileMenu.classList.add("translate-x-full");
  }
});

const swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
});

// سبد خرید + دیتابیس کتاب‌ها + علاقه‌مندی‌ها

document.addEventListener("DOMContentLoaded", () => {
  console.log("MAIN JS IS WORKING");

  // دیتابیس کتاب‌ها
  const books = [
    {
      id: "138066",
      title: "مغازه خودکشی",
      author: "ژان تولی",
      price: 230000,
      image: "/src/images/Bestsellerbooks/138066.webp",
    },
    {
      id: "34766",
      title: "شب های روشن",
      author: "فئودور داستایفسکی",
      price: 230000,
      image: "/src/images/Bestsellerbooks/34766.webp",
    },
    {
      id: "A-667159",
      title: "میراث",
      author: "تریشا ساخلچا",
      price: 230000,
      image: "/src/images/Bestsellerbooks/A-667159.webp",
    },
    {
      id: "33820",
      title: "قصه های خوب برای بچه های خوب",
      author: "مهدی آذریزدی",
      price: 230000,
      image: "/src/images/Bestsellerbooks/33820.webp",
    },
    {
      id: "A-398427",
      title: "تاملات سینمایی",
      author: "کوئنتین تارنتینو",
      price: 230000,
      image: "/src/images/Bestsellerbooks/A-398427.webp",
    },
    {
      id: "164496",
      title: "هتل آنایورت",
      author: "یوسف آتیلگان",
      price: 230000,
      image: "/src/images/Bestsellerbooks/164496.webp",
    },
    {
      id: "A-701689",
      title: "در ممنوعه",
      author: "فریدا مک فادن",
      price: 230000,
      image: "/src/images/Bestsellerbooks/A-701689.webp",
    },
    {
      id: "A-529417",
      title: "در پس آینه",
      author: "",
      price: 230000,
      image: "/src/images/Bestsellerbooks/A-529417.webp",
    },
    {
      id: "A-672737",
      title: "آرتور رمبو",
      author: "",
      price: 230000,
      image: "/src/images/Bestsellerbooks/A-672737.webp",
    },
  ];

  // سبد خرید

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cart.length;

  // Toast

  let toastTimeout;

  function showToast(message) {
    const toast = document.getElementById("toast");

    if (toastTimeout) clearTimeout(toastTimeout);

    toast.textContent = message;

    toast.classList.remove("opacity-0", "translate-y-5");
    toast.classList.add("opacity-100");

    toastTimeout = setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0", "translate-y-5");
    }, 3000);
  }

  // افزودن به سبد خرید

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      const book = books.find((b) => b.id === id);
      if (!book) return;

      cart.push(book);

      localStorage.setItem("cart", JSON.stringify(cart));

      cartCountElement.textContent = cart.length;

      showToast(`«${book.title}» به سبد خرید اضافه شد`);
    });
  });

  document.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".add-to-fav");
    if (!favBtn) return;

    const id = favBtn.dataset.id;

    const book = books.find((b) => b.id == id);
    if (!book) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.some((f) => f.id == id)) {
      favorites.push(book);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    showToast(`«${book.title}» به علاقه‌مندی‌ها اضافه شد`);
  });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.title === product.title);

  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("به سبد خرید اضافه شد!");
}
