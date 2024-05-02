document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const decision1Input = document.getElementById('decision1Input');
    const decision2Input = document.getElementById('decision2Input');
    const decisionButtonsDiv = document.getElementById('decisionButtons');
    const resultDiv = document.getElementById('result');
    const timerDiv = document.getElementById('timer');
    const mainContainer = document.querySelector('.container');
    let countdown;
  
    submitBtn.addEventListener('click', function() {
      const decision1 = decision1Input.value.trim();
      const decision2 = decision2Input.value.trim();
      if (decision1 === '' || decision2 === '') {
        alert('Please enter both decisions.');
        return;
      }
  
      displayDecisionButtons(decision1, decision2);
      startTimer();
    });
  
    function displayDecisionButtons(decision1, decision2) {
      decisionButtonsDiv.innerHTML = `
        <button class="decision-btn" data-decision="${decision1}">${decision1}</button>
        <button class="decision-btn" data-decision="${decision2}">${decision2}</button>
      `;
  
      const decisionBtns = document.querySelectorAll('.decision-btn');
      decisionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          resultDiv.innerText = `You chose ${btn.dataset.decision}.`;
          clearInterval(countdown); // Stop the timer when a decision is made
          setTimeout(hideElements, 2000); // Hide elements after 2 seconds
        });
      });
    }
  
    function startTimer() {
      let seconds = 5;
      timerDiv.innerText = `Time left: ${seconds} seconds`;
      countdown = setInterval(function() {
        seconds--;
        timerDiv.innerText = `Time left: ${seconds} seconds`;
        if (seconds === 0) {
          clearInterval(countdown);
          // Hide elements after 2 seconds
          displayTimeoutMessage();
        }
      }, 1000);
    }
  
    function hideElements() {
      decisionButtonsDiv.style.display = 'none';
      resultDiv.style.display = 'none';
      timerDiv.style.display = 'none';
    }
  
    function displayTimeoutMessage() {
      const decision1 = decision1Input.value.trim();
      const decision2 = decision2Input.value.trim();
  
      const randomIndex = Math.floor(Math.random() * 2);
      const chosenDecision = randomIndex === 0 ? decision1 : decision2;
  
      const timeoutMessage = document.createElement('div');
      timeoutMessage.classList.add('timeout-message');
      timeoutMessage.innerHTML = `
        <h2>Why didn't you pick?</h2>
        <ul>
          <li>${decision1}</li>
          <li>${decision2}</li>
        </ul>
        <p>We chose for you: ${chosenDecision}</p>
      `;
      document.body.appendChild(timeoutMessage);
    }
  });
  