function proximaPagina() {
    // Verifica se tem dados do cliente
    if (!localStorage.getItem('clienteDados')) {
        alert('Por favor, faça o cadastro primeiro!');
        window.location.href = 'index.html';
        return;
    }
    window.location.href = 'agendamento.html';
}
