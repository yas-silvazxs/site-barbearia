const barberPhone = '5511987654321';

function salvarCadastro(event) {
  event.preventDefault();
  const nome = document.getElementById('nome')?.value.trim();
  const telefone = document.getElementById('telefone')?.value.trim();
  const servico = document.getElementById('servico')?.value;

  if (!nome || !telefone || !servico) {
    alert('Preencha todos os dados antes de continuar.');
    return;
  }

  const cadastro = { nome, telefone, servico };
  localStorage.setItem('cadastroBarbearia', JSON.stringify(cadastro));
  alert('Cadastro salvo. Agora vá para Agendamento.');
}

function salvarAgendamento(event) {
  event.preventDefault();
  const dia = document.getElementById('dia')?.value;
  const horario = document.getElementById('horario')?.value;
  const servicoAgendamento = document.getElementById('servicoAgendamento')?.value;

  if (!dia || !horario || !servicoAgendamento) {
    alert('Selecione dia, horário e serviço para agendar.');
    return;
  }

  const cadastro = JSON.parse(localStorage.getItem('cadastroBarbearia') || '{}');
  if (!cadastro.nome || !cadastro.telefone) {
    alert('Por favor faça o cadastro primeiro na página inicial.');
    window.location.href = 'index.html';
    return;
  }

  const agendamento = {
    nome: cadastro.nome,
    telefone: cadastro.telefone,
    servicoEscolhido: servicoAgendamento,
    dia,
    horario,
  };
  localStorage.setItem('agendamentoBarbearia', JSON.stringify(agendamento));
  window.location.href = 'confirmation.html';
}

function mostrarResumoConfirmacao() {
  const agendamento = JSON.parse(localStorage.getItem('agendamentoBarbearia') || '{}');
  const resumo = document.getElementById('resumo');
  const whatsappLink = document.getElementById('whatsappLink');

  if (!agendamento.nome || !agendamento.horario) {
    resumo.textContent = 'Nenhum agendamento encontrado. Volte ao agendamento para marcar. '; 
    whatsappLink.style.display = 'none';
    return;
  }

  resumo.innerHTML = `Cliente: <strong>${agendamento.nome}</strong><br>
                      Telefone: <strong>${agendamento.telefone}</strong><br>
                      Serviço: <strong>${agendamento.servicoEscolhido}</strong><br>
                      Dia: <strong>${agendamento.dia}</strong><br>
                      Horário: <strong>${agendamento.horario}</strong>`;

  const mensagem = encodeURIComponent(
    `Olá, aqui é da Barbearia Nova. O cliente ${agendamento.nome} agendou para ${agendamento.dia} às ${agendamento.horario}. Serviço: ${agendamento.servicoEscolhido}.`);
  whatsappLink.href = `https://api.whatsapp.com/send?phone=${barberPhone}&text=${mensagem}`;
  whatsappLink.textContent = 'Enviar notificação no WhatsApp';
}

function iniciarPagina() {
  const formCadastro = document.getElementById('formCadastro');
  const formAgendamento = document.getElementById('formAgendamento');

  if (formCadastro) {
    formCadastro.addEventListener('submit', salvarCadastro);
    const cadastro = JSON.parse(localStorage.getItem('cadastroBarbearia') || '{}');
    if (cadastro.nome) {
      document.getElementById('nome').value = cadastro.nome;
      document.getElementById('telefone').value = cadastro.telefone;
      document.getElementById('servico').value = cadastro.servico;
    }
  }

  if (formAgendamento) {
    formAgendamento.addEventListener('submit', salvarAgendamento);
    const cadastro = JSON.parse(localStorage.getItem('cadastroBarbearia') || '{}');
    if (!cadastro.nome) {
      alert('Cadastre-se primeiro na página inicial.');
      window.location.href = 'index.html';
    }
  }

  if (document.getElementById('confirmCard')) {
    mostrarResumoConfirmacao();
  }
}

window.addEventListener('DOMContentLoaded', iniciarPagina);
