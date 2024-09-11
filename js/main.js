'use strict';
const searchReset = document.getElementById('search-reset');
const searchForm = document.getElementById('search-form');
if (searchReset && searchForm) {
  searchReset.addEventListener('click', () => {
    searchForm.reset();
  });
}
