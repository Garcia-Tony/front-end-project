const searchReset = document.getElementById('search-reset');
const searchForm = document.getElementById('search-form') as HTMLFormElement;

if (searchReset && searchForm) {
  searchReset.addEventListener('click', () => {
    searchForm.reset();
  });
}
