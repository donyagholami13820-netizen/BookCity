document.addEventListener("DOMContentLoaded", () => {
  const favContainer = document.getElementById("fav-items");

  function loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  }

  let favorites = loadFavorites();

  function renderFavorites() {
    favContainer.innerHTML = "";

    // اگر خالی بود
    if (!favorites || favorites.length === 0) {
      favContainer.innerHTML = `
                <p class="text-center text-[#5c3d1e] text-lg font-semibold">
                    هنوز هیچ کتابی به علاقه‌مندی‌ها اضافه نشده
                </p>
            `;
      return;
    }

    // ساخت کارت‌ها
    favorites.forEach((item, index) => {
      const card = document.createElement("div");
      card.className =
        "flex items-center bg-[#f3e7d3] p-3 md:p-4 rounded-xl shadow-md gap-3 md:gap-4 " +
        "border border-[#d6c3a5] transition hover:shadow-lg duration-300 " +
        "justify-between flex-row-reverse max-w-full";

      card.innerHTML = `
                <div class="flex items-center gap-3 md:gap-4 flex-row-reverse w-full">

                    <img src="${item.image || ""}"
                         class="w-16 h-20 md:w-20 md:h-28 rounded-lg object-cover shadow-sm border border-[#c9b79a]">

                    <div class="flex-1 text-right">
                        <h3 class="font-bold text-base md:text-lg text-gray-800 leading-tight">
                            ${item.title || "بدون عنوان"}
                        </h3>

                        <p class="text-gray-600 text-xs md:text-sm mt-1">
                            ${item.author || ""}
                        </p>

                        <p class="text-[#8b5e34] font-extrabold mt-2 text-sm md:text-base">
                            ${(item.price || 0).toLocaleString()} تومان
                        </p>
                    </div>

                    <button data-index="${index}"
                        class="remove-fav bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm transition">
                        حذف
                    </button>

                </div>
            `;

      favContainer.appendChild(card);
    });

    // حذف از علاقه‌مندی‌ها
    document.querySelectorAll(".remove-fav").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;

        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        renderFavorites();
      });
    });
  }

  renderFavorites();
});
