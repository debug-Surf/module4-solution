(function () {
  'use strict';

  var CATEGORIES_URL = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var MENU_ITEMS_URL = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";

  // Load categories on page load
  $(document).ready(function () {
    $.ajax({
      url: CATEGORIES_URL,
      success: function (data) {
        buildCategoryTabs(data);
        // Load first category by default
        if (data.length > 0) {
          loadMenuItems(data[0].short_name, $('#category-tabs li:first-child a'));
        }
      },
      error: function () {
        $('#category-tabs').html('<li><a>Error loading categories</a></li>');
      }
    });
  });

  function buildCategoryTabs(categories) {
    var tabs = $('#category-tabs');
    tabs.empty();
    $.each(categories, function (index, category) {
      var li = $('<li>').append(
        $('<a>').attr('href', '#').text(category.name).data('short_name', category.short_name)
      );
      tabs.append(li);
    });

    // Click handler for category tabs
    tabs.on('click', 'a', function (e) {
      e.preventDefault();
      var shortName = $(this).data('short_name');
      loadMenuItems(shortName, $(this));
    });
  }

  function loadMenuItems(shortName, clickedLink) {
    // Set active tab
    $('#category-tabs li').removeClass('active');
    clickedLink.parent().addClass('active');

    $('#menu-items').html('<p>Loading menu items...</p>');

    $.ajax({
      url: MENU_ITEMS_URL + shortName + ".json",
      success: function (data) {
        buildMenuItems(data);
      },
      error: function () {
        $('#menu-items').html('<p>Error loading menu items.</p>');
      }
    });
  }

  function buildMenuItems(items) {
    var container = $('#menu-items');
    container.empty();

    if (!items || items.length === 0) {
      container.html('<p>No items found.</p>');
      return;
    }

    $.each(items, function (index, item) {
      var imgSrc = item.image_url ? item.image_url : 'https://via.placeholder.com/300x120?text=No+Image';
      var tile = $('<div>').addClass('col-sm-6 col-md-4').append(
        $('<div>').addClass('menu-item-tile').append(
          $('<img>').attr('src', imgSrc).attr('alt', item.name),
          $('<h4>').text(item.name),
          $('<p>').text(item.description || ''),
          $('<p>').addClass('price').text('$' + (item.price_small || item.price_large || ''))
        )
      );
      container.append(tile);
    });
  }

})();
