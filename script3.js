// Dados dos horários disponíveis
const horariosDisponiveis = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
let diaSelecionado = null;
let horarioSelecionado = null;

// Verifica se tem dados do cliente
if (!localStorage.getItem('clienteDados')) {
    alert('Por favor, faça o cadastro primeiro!');
    window.location.href = 'index.html';
}

// Gera dias disponíveis
function gerarDias() {
    const container = document.getElementById('diasContainer');
    const hoje = new Date();
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 7; i++) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() + i);
        
        const diaSemana = diasSemana[data.getDay() === 0 ? 6 : data.getDay() - 1];
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        
        const diaBtn = document.createElement('div');
        diaBtn.className = 'dia-btn';
        diaBtn.innerHTML = `${diaSemana}<br><small>${dia}/${mes}</small>`;
        diaBtn.onclick = () => selecionarDia(diaBtn, diaSemana, `${dia}/${mes}`);
        
        container.appendChild(diaBtn);
    }
}

function selecionarDia(btn, nomeDia, data) {
    document.querySelectorAll('.dia-btn').forEach(b => b.classList.remove('selecionado'));
    btn.classList.add('selecionado');
    diaSelecionado = { nome: nomeDia, data: data };
    
    // Mostra horários
    document.getElementById('horariosContainer').style.display = 'block';
    gerarHorarios();
}

function gerarHorarios() {
    const container = document.getElementById('horariosLista');
    container.innerHTML = '';
    
    horariosDisponiveis.forEach(horario => {
        const horarioBtn = document.createElement('div');
        horarioBtn.className = 'horario-btn';
        horarioBtn.textContent = horario;
        horarioBtn.onclick = () => selecionarHorario(horarioBtn, horario);
        container.appendChild(horarioBtn);
    });
}

function selecionarHorario(btn, horario) {
    document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('selecionado'));
    btn.classList.add('selecionado');
    horarioSelecionado = horario;
    
    // Mostra botão de confirmar
    document.getElementById('btnConfirmar').style.display = 'block';
}

function confirmarAgendamento() {
    if (!diaSelecionado || !horarioSelecionado) {
        alert('Selecione dia e horário!');
        return;
    }
    
    // Salva agendamento
    const clienteDados = JSON.parse(localStorage.getItem('clienteDados'));
    const agendamento = {
        ...clienteDados,
        dia: diaSelecionado,
        horario: horarioSelecionado,
        dataAgendamento: new Date().toLocaleString('pt-BR')
    };
    
    localStorage.setItem('agendamentoCompleto', JSON.stringify(agendamento));
    
    // Envia WhatsApp
    enviarWhatsapp(agendamento);
    
    // Vai para página de confirmação
    window.location.href = 'confirmacao.html';
}

function enviarWhatsapp(agendamento) {
    const numeroBarbearia = '5511999999999'; // SUBSTITUA PELO NÚMERO REAL (sem + ou espaços)
    const mensagem = `🪒 *NOVO AGENDAMENTO*\n\n` +
                    `👤 *Cliente:* ${agendamento.nome}\n` +
                    `📱 *Telefone:* ${agendamento.telefone}\n` +
                    `✂️ *Serviço:* ${agendamento.servico}\n` +
                    `📅 *Dia:* ${agendamento.dia.nome} (${agendamento.dia.data})\n` +
                    `🕒 *Horário:* ${agendamento.horario}\n\n` +
                    `✅ *Agendamento confirmado automaticamente!*\n` +
                    `⏰ Data/Hora: ${agendamento.dataAgendamento}`;
    
    const url = `https://wa.me/${numeroBarbearia}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Inicializa
gerarDias();
