document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('content');
  const preview = document.getElementById('preview');
  if (!textarea || !preview) return;

  const parse = (text) => {
    return text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" style="max-width:100%;">')
      .replace(/\n$/gim, '<br/>');
  };

  textarea.addEventListener('input', () => {
    preview.innerHTML = parse(textarea.value);
  });

  // Initialize on page load
  preview.innerHTML = parse(textarea.value);
});