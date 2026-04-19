document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;

    localStorage.setItem('nome', nome);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('servico', servico);

    window.location.href = 'pagina2.html';
});