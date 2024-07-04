/**
 * @fileoverview Este script gestiona eventos relacionados con formularios y llamadas a APIs para operaciones CRUD.
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @namespace scripts
 */

// General Variables
const fragment = document.createDocumentFragment();


/* *********************EVENTS**********************/


/**
 * Evento que se dispara cuando el contenido del DOM se carga completamente.
 * Inicializa la validación del formulario en el formulario de registro.
 */

document.addEventListener('DOMContentLoaded', () => validateForm());

// evento - User CREATE
/**
 * Evento que se dispara al enviar el formulario en el formulario de registro.
 * Evita la presentación predeterminada del formulario, valida las entradas del formulario y envía una solicitud POST para crear un nuevo usuario.
 */

document.addEventListener('submit', (event) => {
    if (event.target.matches('#formSignUp')) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const role = "user";

        fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, role: role })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/login', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            document.open();
                            document.write(html);
                            document.close();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// evento - User UPDATE (by User)
/**
 * Evento que se dispara al enviar el formulario en el formulario de actualización de perfil (por usuario).
 * Evita la presentación predeterminada del formulario y envía una solicitud PUT para actualizar los detalles del perfil del usuario.
 */

document.addEventListener('submit', (event) => {
    if (event.target.matches('#formProfile')) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        fetch('http://localhost:3000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, role: "user", old_email: "diego@gmail.com" })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Profile updated');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// evento - User UPDATE (by Admin)
/**
 * Evento que se dispara al enviar el formulario en el formulario de actualización de usuario (por administrador).
 * Evita la presentación predeterminada del formulario, valida las entradas del formulario y envía una solicitud PUT para actualizar los detalles del usuario.
 */

document.addEventListener('submit', (event) => {
    if (event.target.matches('#formUser')) {
        event.preventDefault();
        const formElement = document.querySelector('#formUser');
        const old_email = formElement.getAttribute('data-email');
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const role = event.target.role.value;
        console.log(role)

        fetch('http://localhost:3000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, role: role, old_email: old_email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/users', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                        alert('Profile updated');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - User DELETE (by User)
/**
 * Evento que se dispara al hacer clic en la eliminación de usuario (por usuario).
 * Evita la acción predeterminada, valida la entrada de correo electrónico y envía una solicitud DELETE para eliminar un usuario.
 */

document.addEventListener('click', (event) => {
    if (event.target.matches('#deleteButton')) {
        event.preventDefault();
        const email = "diego@gmail.com";

        fetch(`http://localhost:3000/api/user?email=${email}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            document.open();
                            document.write(html);
                            document.close();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - User DELETE (by Admin)
/**
 * Evento que se dispara al hacer clic en la eliminación de usuario (por administrador).
 * Evita la acción predeterminada, valida la entrada de correo electrónico y envía una solicitud DELETE para eliminar un usuario.
 */

document.addEventListener('click', (event) => {
    if (event.target.matches('.deleteUserButton')) {
        event.preventDefault();
        const email = event.target.value;

        fetch(`http://localhost:3000/api/user?email=${email}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/users', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - Favorito CREATE
/**
 * Evento que se dispara al guardar un anuncio como favorito.
 */

document.addEventListener('click', (event) => {
    if (event.target.matches('.favButtonCreate')) {
        event.preventDefault();
        const email = "edu@gmail.com";
        const jobID = event.target.value;

        fetch('http://localhost:3000/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, job_id: jobID })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/favorites', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - Favorite DELETE
/**
 * Evento que se dispara al eliminar un favorito.
 */

document.addEventListener('click', (event) => {
    if (event.target.matches('.favButtonDelete')) {
        event.preventDefault();
        const email = "edu@gmail.com";
        const jobID = event.target.value;

        fetch(`http://localhost:3000/api/favorites?email=${email}&job_id=${jobID}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/favorites', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - Job CREATE
/**
 * Evento que se dispara al enviar el formulario en la creación de anuncio.
 * Evita la presentación predeterminada del formulario, valida las entradas del formulario y envía una solicitud POST para crear un nuevo anuncio.
 */

document.addEventListener('submit', (event) => {
    if (event.target.matches('#formDashboard')) {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const skills = event.target.skills.value;
        const arraySkills = [skills];
        console.log(arraySkills)
        const client_location = event.target.client_location.value;
        const url = event.target.url.value;


        fetch('http://localhost:3000/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, description: description, skills: arraySkills, client_location: client_location, url: url, source: 'admin', status: true })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/dashboard', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - Job DELETE
/**
 * Evento que se dispara al hacer clic en la eliminación de anuncio.
 * Evita la acción predeterminada y envía una solicitud DELETE para eliminar un anuncio.
 */

document.addEventListener('click', (event) => {
    if (event.target.matches('.deleteJobButton')) {
        event.preventDefault();
        const title = event.target.value;

        fetch(`http://localhost:3000/api/jobs?title=${title}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/dashboard', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// evento - Job UPDATE
document.addEventListener('submit', (event) => {
    if (event.target.matches('#formJob')) {
        event.preventDefault();
        console.log('boton funciona')
        const formElement = document.querySelector('#formJob');
        const old_title = formElement.getAttribute('data-title');
        const title = event.target.title.value;
        const description = event.target.description.value;
        const skills = [event.target.skills.value];
        const client_location = event.target.client_location.value;
        const url = event.target.url.value;

        fetch(`http://localhost:3000/api/jobs?title=${old_title}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, description: description, skills: skills, client_location: client_location, url: url, source: 'admin', status: true })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/dashboard', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                        alert('Job updated');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// btn ir a Job Editor desde Dashboard
document.addEventListener('click', (event) => {
    if (event.target.matches('.goToEditJob')) {
        event.preventDefault();
        const job_id = event.target.value;
        console.log(job_id)

        fetch(`http://localhost:3000/job-editor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ job_id: job_id })
        })

            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// btn ir a User Editor desde User Dashboard
document.addEventListener('click', (event) => {
    if (event.target.matches('.goToEditUser')) {
        event.preventDefault();
        const email = event.target.value;
        console.log(email)
        console.log('probando evento gotoedit')

        fetch(`http://localhost:3000/user-editor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })

            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});











//**** SCRIPT HEADER.PUG **** */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

//**** SCRIPT HOME.PUG **** */

// Filtro keyword
document.addEventListener('submit', (event) => {
    if (event.target.matches('.searchKeyword')) {
        event.preventDefault();
        const keyword = event.target.keyword.value;

        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyword: keyword })
        })
            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Filtro skill
document.addEventListener('submit', (event) => {
    if (event.target.matches('.searchSkill')) {
        event.preventDefault();
        const skill = event.target.skill.value;

        fetch('http://localhost:3000/searchbyskill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill: skill })
        })
            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});



/**** SCRIPT SIGNUP.PUG *****/

/**
 * Función para validar el formulario de registro.
 * Verifica si los campos obligatorios están completos y muestra mensajes de error si no lo están.
 */

const validateForm = () => {
    const form = document.querySelector('.cardForms');
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');
    const confirmPassword = document.getElementById('confirmPassword');
    const inputs = document.querySelectorAll('input');
    const passwordInstructions = document.getElementById('instructions');
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordRegex = /^.{8}$/;

    passwordInstructions.style.display = 'none';

    password.addEventListener('focus', () => {
        passwordInstructions.style.display = 'block';
    });

    password.addEventListener('blur', () => {
        passwordInstructions.style.display = 'none';
    });

    email.addEventListener('input', () => {
        if (email.checkValidity()) {
            email.classList.remove('error');
        } else {
            email.classList.add('error');
        }
    });

    form.addEventListener('submit', (event) => {
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        if (!passwordRegex.test(password.value)) {
            password.classList.add('error');
            isValid = false;
            passwordInstructions.style.display = 'block';
        } else {
            password.classList.remove('error');
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add('error');
            confirmPassword.setCustomValidity('Passwords do not match');
            isValid = false;
        } else {
            confirmPassword.classList.remove('error');
            confirmPassword.setCustomValidity('');
        }

        if (isValid === false) {
            event.preventDefault();
        }
    });

    window.onload = () => {
        google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('googleSignInButton'),
            { theme: 'outline', size: 'large' } 
        );
        google.accounts.id.prompt(); 
    };

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
       
    }
};


//**** SCRIPT FOOTER.PUG **** */


const shuffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];

    }
    return array;
};

// Footer Logic
const generateFooter = () => {
    const developers = [
        {
            name: 'Emilio Latorre Guerra',
            github: 'https://github.com/emiliolatorre'
        },
        {
            name: 'Eduardo Fatou Cerrato',
            github: 'https://github.com/EduFatou'
        },
        {
            name: 'Diego Blázquez Rosado',
            github: 'https://github.com/diegoblazquezr'
        }
    ];
    const footerDevsContainer = document.querySelector('#footer-devs-container');
    shuffleArray(developers);
    developers.forEach((element) => {
        const spanDev = document.createElement('SPAN');
        spanDev.innerHTML = `${element.name} <a href="${element.github}" target="_blank"><i class="fa-brands fa-github fa-lg" style="color: #ffffff;"></i></a>`;
        fragment.append(spanDev);
    });
    footerDevsContainer.append(fragment);
};

// Function Calls
generateFooter();