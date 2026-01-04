document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const itemsCountElement = document.getElementById("items-count");
  const subtotalElement = document.getElementById("subtotal-price");

  const DISCOUNT = 15000;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<div class="text-center py-20 opacity-50 font-bold text-lg">سبد خرید شما خالی است.</div>';
      updateSummary(0, 0);
      return;
    }

    cart.forEach((item, index) => {
      const quantity = item.quantity || 1;
      const itemTotal = item.price * quantity;
      subtotal += itemTotal;
      totalQuantity += quantity;

      const card = document.createElement("div");
      card.className =
        "bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 flex items-center gap-4 shadow-sm hover:shadow-md transition-all group";

      card.innerHTML = `
            <div class="w-20 h-20 sm:w-24 sm:h-24 bg-[#e9dcc9] rounded-xl flex-shrink-0 overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>

            <div class="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 class="font-bold text-lg">${item.title}</h3>
                    <p class="text-sm opacity-60 mt-1">${item.author || ""}</p>
                </div>

                <div class="flex items-center gap-4">
                    <div class="flex items-center bg-white/80 rounded-lg border border-gray-200 p-1 shadow-inner text-[#5c3d1e]">
                        <button onclick="changeQty(${index}, 1)" class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition font-bold text-lg">+</button>
                        <span class="px-3 font-bold text-base">${quantity.toLocaleString("fa-IR")}</span>
                        <button onclick="changeQty(${index}, -1)" class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition font-bold text-lg">-</button>
                    </div>

                    <div class="text-left min-w-[110px]">
                        <span class="font-extrabold text-[#8b5e34] text-lg">${itemTotal.toLocaleString("fa-IR")} ت</span>
                    </div>
                </div>
            </div>
      `;
      cartItemsContainer.appendChild(card);
    });

    updateSummary(subtotal, totalQuantity);
  }

  function updateSummary(subtotal, count) {
    // به‌روزرسانی تعداد در پرانتز
    if (itemsCountElement)
      itemsCountElement.textContent = count.toLocaleString("fa-IR");

    // به‌روزرسانی قیمت کالاها (قبل از تخفیف)
    if (subtotalElement)
      subtotalElement.textContent = subtotal.toLocaleString("fa-IR") + " تومان";

    // محاسبه و نمایش جمع نهایی
    const finalTotal = subtotal > 0 ? subtotal - DISCOUNT : 0;
    totalPriceElement.textContent =
      (finalTotal > 0 ? finalTotal : 0).toLocaleString("fa-IR") + " ت";
  }

  // تابع تغییر تعداد
  window.changeQty = (index, delta) => {
    let currentQty = cart[index].quantity || 1;

    if (currentQty + delta < 1) {
      if (confirm("آیا می‌خواهید این محصول را از سبد خرید حذف کنید؟")) {
        cart.splice(index, 1);
      }
    } else {
      cart[index].quantity = currentQty + delta;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();
});
