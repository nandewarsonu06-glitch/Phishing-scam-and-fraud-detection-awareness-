function toggleMenu(){document.getElementById('nav').classList.toggle('open')}

function checkScam(){
 const chosen=[...document.querySelectorAll('#detect input:checked')].map(x=>x.value);
 const correct=['urgency','link','otp','impersonation'];
 const result=document.getElementById('detectorResult');
 const score=correct.filter(x=>chosen.includes(x)).length;
 result.style.display='block';
 if(score===4 && chosen.length===4) result.innerHTML='✅ Excellent! You identified all 4 major red flags. The safest action is to stop and verify through an official channel.';
 else result.innerHTML=`⚠️ You identified ${score}/4 major red flags. Look for urgency, suspicious links, requests for OTPs and impersonation.`;
}

const scenarios={
 delivery:'A message says a parcel cannot be delivered and asks you to click a link and pay a small “re-delivery” fee. Red flags: unexpected request, payment link, urgency and possible impersonation. Verify through the delivery company’s official app/site.',
 job:'A “job” promises high income and asks for a registration or processing fee. Red flags: upfront payment, unrealistic promises and requests for personal documents. Verify the employer independently.',
 upi:'Someone says they are sending you money and asks for your UPI PIN or asks you to approve a payment request. Remember: a UPI PIN authorizes a payment; it is not needed to receive money.',
 support:'A caller says your computer/account has a security problem and asks you to install remote-access software. Do not grant remote access to an unknown caller. Contact the service through an official channel.',
 social:'A familiar-looking social-media account urgently asks for money. Verify the person using another trusted method before sending anything.',
 qr:'A QR code is presented as a way to “receive” a refund or prize. Scanning can lead to a payment or malicious destination. Check the recipient and amount before approving anything.'
};
function showScenario(key){document.getElementById('scenarioBox').textContent=scenarios[key]}

const questions=[
 ['You receive an unexpected bank message asking for your OTP. What should you do?', ['Share it if the logo looks genuine','Click the link quickly','Do not share it; verify independently','Reply with your account number'],2],
 ['What does smishing mean?', ['Phishing through SMS/messages','Phishing by voice call','A strong password','A bank security feature'],0],
 ['Is HTTPS alone proof that a website is legitimate?', ['Yes','No','Only on mobile','Only for banks'],1],
 ['What does a UPI PIN do?', ['Receives money','Authorizes a payment','Verifies your SIM','Unlocks a phone'],1],
 ['Which is a phishing warning sign?', ['Unexpected urgency','Independent verification','Official app opened directly','Strong MFA'],0],
 ['What should you do after a suspected fraud?', ['Delete all evidence','Send more money to reverse it','Preserve evidence and contact official channels','Give the caller your OTP'],2],
 ['Which practice improves account security?', ['Reuse one password','Disable MFA','Use unique passwords and MFA','Share recovery codes'],2],
 ['A caller claiming to be support asks for remote access. What is safest?', ['Allow it immediately','Verify through an official support route','Give them your password','Send them an OTP'],1]
];
function renderQuiz(){
 const box=document.getElementById('quizBox');
 box.innerHTML=questions.map((q,i)=>`<div class="q"><h3>${i+1}. ${q[0]}</h3>${q[1].map((a,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${a}</label>`).join('')}</div>`).join('');
}
function submitQuiz(){
 let score=0, answered=0;
 questions.forEach((q,i)=>{const a=document.querySelector(`input[name=q${i}]:checked`);if(a){answered++;if(+a.value===q[2])score++}});
 const r=document.getElementById('quizResult');r.style.display='block';
 if(answered<questions.length){r.textContent=`Please answer all ${questions.length} questions. You answered ${answered}.`;return}
 r.textContent=`Your score: ${score}/${questions.length}. ${score>=7?'Excellent awareness!':'Good start — review the safety checklist and try again.'}`;
}
function saveSurvey(e){
 e.preventDefault();
 const entry={name:document.getElementById('sname').value,before:document.getElementById('before').value,after:document.getElementById('after').value,topic:document.getElementById('topic').value,feedback:document.getElementById('feedback').value,date:new Date().toLocaleString()};
 const data=JSON.parse(localStorage.getItem('cybersafeSurvey')||'[]');data.push(entry);localStorage.setItem('cybersafeSurvey',JSON.stringify(data));
 const r=document.getElementById('surveySaved');r.style.display='block';r.textContent='✓ Feedback saved on this device for your project demo.';e.target.reset();
}
renderQuiz();
