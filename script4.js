// Verifica se tem agendamento
const agendamento = JSON.parse(localStorage.getItem('agendamentoCompleto'));

if (!agendamento) {
    alert('Nenhum agendamento encontrado!');
    window.location.href = 'index.html';
} else {
    // Preenche detalhes
    document.getElementById('detalhesAgendamento').innerHTML = `
        <h3><i class="fas fa-calendar-check"></i> Resumo do seu Agendamento</h3>
        <div class="detalhe-item">
            <span><i class="fas fa-user"></i> Nome:</span>
            <span>${agendamento.nome}</span>
        </div>
        <div class="detalhe-item">
            <span><i class="fas fa-phone"></i> Telefone:</span>
            <span>${agendamento.telefone}</span>
        </div>
        <div class="detalhe-item">
            <span><i class="fas fa-cut"></i> Serviço:</span>
            <span>${agendamento.servico}</span>
        </div>
        <div class="detalhe-item">
            <span><i class="fas fa-calendar-day"></i> Dia:</span>
            <span>${agendamento.dia.nome} (${agendamento.dia.data})</span>
        </div>
        <div class="detalhe-item">
            <span><i class="fas fa-clock"></i> Horário:</span>
            <span>${agendamento.horario}</span>
        </div>
        <div class="detalhe-item">
            <span><i class="fas fa-check-double"></i> Status:</span>
            <span>✅ CONFIRMADO</span>
        </div>
    `;
}

function abrirWhatsapp() {
    const numero = '5511999999999'; // SUBSTITUA PELO NÚMERO REAL
    window.open(`https://wa.me/${numero}`, '_blank');
}

function novAgendamento() {
    if (confirm('Deseja fazer um novo agendamento?')) {
        localStorage.removeItem('clienteDados');
        localStorage.removeItem('agendamentoCompleto');
        window.location.href = 'index.html';
    }
}
