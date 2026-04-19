document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dados = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        servico: document.getElementById('servico').value
    };
    
    // Salva no localStorage
    localStorage.setItem('clienteDados', JSON.stringify(dados));
    
    // Redireciona para página 2
    window.location.href = 'precos.html';
});
