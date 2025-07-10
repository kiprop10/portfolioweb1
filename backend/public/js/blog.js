document.addEventListener('DOMContentLoaded', function () {
  var quill = new Quill('#editor', {
    theme: 'snow'
  });
  var form = document.querySelector('form');
  var contentInput = document.getElementById('hiddenContent');
  if (form && contentInput) {
    form.addEventListener('submit', function () {
      contentInput.value = quill.root.innerHTML;
    });
  }
});