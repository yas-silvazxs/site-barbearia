document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nome').textContent = localStorage.getItem('nome');
    document.getElementById('telefone').textContent = localStorage.getItem('telefone');
    document.getElementById('servico').textContent = localStorage.getItem('servico');
    document.getElementById('dia').textContent = localStorage.getItem('dia');
    document.getElementById('hora').textContent = localStorage.getItem('hora');
});

document.getElementById('enviarWhatsBtn').addEventListener('click', function() {
    const mensagem = localStorage.getItem('mensagem');
    const numeroWhats = '5511999999999'; // Substitua pelo número real da barbearia
    const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
});