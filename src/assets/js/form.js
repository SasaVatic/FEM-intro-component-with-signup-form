document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const inputs = document.querySelectorAll('.form__input');
    const valMessages = document.querySelectorAll('.form__validation-msg')
    const valIcons = document.querySelectorAll('.form__error-img')

    form.addEventListener('submit', onSubmit);

    function onSubmit(event) {
        event.preventDefault();
        
        if (validateForm()) {
            alert('Your form has been submited!');
            event.target.reset();
        }
    }
    
    function validateForm() {
        let isFormValid = true;

        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                if (inputs[i].type === 'email') {
                    valMessages[i].textContent = 'Email cannot be empty';
                }

                valIcons[i].classList.add('active');
                valMessages[i].classList.add('active');
                inputs[i].classList.add('invalid');
            }
            else {
                if (inputs[i].type === 'email') {
                    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    const isValid = inputs[i].value.match(emailRegex);

                    if (isValid) {
                        valMessages[i].textContent = '';
                        valIcons[i].classList.remove('active');
                        valMessages[i].classList.remove('active');
                        inputs[i].classList.remove('invalid');
                    }
                    else {
                        valMessages[i].textContent = 'Looks like this is not an email';
                        valIcons[i].classList.add('active');
                        valMessages[i].classList.add('active');
                        inputs[i].classList.add('invalid');
                    }
                }
                else {
                    valIcons[i].classList.remove('active');
                    valMessages[i].classList.remove('active');
                    inputs[i].classList.remove('invalid');
                }
            }
        }

        valMessages.forEach(m => {
            if (m.classList.contains('active')) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }
});