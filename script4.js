document.getElementById('confirmarBtn').addEventListener('click', function() {
    const nome = localStorage.getItem('nome');
    const telefone = localStorage.getItem('telefone');
    const servico = localStorage.getItem('servico');
    const dia = localStorage.getItem('dia');
    const hora = localStorage.getItem('hora');

    localStorage.setItem('mensagem', `Novo agendamento:\nNome: ${nome}\nTelefone: ${telefone}\nServiço: ${servico}\nDia: ${dia}\nHorário: ${hora}`);

    window.location.href = 'pagina5.html';
});