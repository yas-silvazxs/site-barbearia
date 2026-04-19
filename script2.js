function proximaPagina() {
    // Verifica se tem dados do cliente
    const clienteDados = localStorage.getItem('clienteDados');
    
    if (!clienteDados) {
        alert('❌ Por favor, faça o cadastro primeiro!');
        window.location.href = 'index.html';
        return;
    }
    
    // Redireciona para agendamento
    window.location.href = 'pagina2.html';
}

// Botão voltar (opcional)
function voltarCadastro() {
    window.location.href = 'index.html';
}
