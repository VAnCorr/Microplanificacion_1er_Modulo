// app.js

document.addEventListener('DOMContentLoaded', () => {
    const accordionContainer = document.getElementById('scheduleAccordion');
    const searchInput = document.getElementById('searchInput');
    const printButton = document.getElementById('printButton');
    const currentYearSpan = document.getElementById('currentYear');

    // --- INICIO: DATOS DEL HORARIO ---
    // Datos procesados a partir de tu información
    const scheduleData = [
        // Mayo 2025
        { "dia": "Viernes", "fecha": "02/05/2025", "hora": "Hora por definir", "asignatura": "Principios fisiológicos de electrocardiografía", "docente": "Dr. Delgado (Docente) / Dra. Suazo (Exp.)", "sala": "Sala por definir" },
        { "dia": "Martes", "fecha": "06/05/2025", "hora": "Hora por definir", "asignatura": "Crecimiento de cavidades, Cardiopatia isquemica y bloqueos de rama", "docente": "Dr. Vanegas (Docente) / Dr. Soza (Exp.)", "sala": "Sala por definir" },
        { "dia": "Viernes", "fecha": "09/05/2025", "hora": "Hora por definir", "asignatura": "Bradiarritmias-taquiarritmias", "docente": "Dr. Gustavo Espinoza (Docente) / Dr. Yodan Arauz (Exp.)", "sala": "Sala por definir" },
        { "dia": "Martes", "fecha": "13/05/2025", "hora": "Hora por definir", "asignatura": "Antiarritmicos", "docente": "Dr. Berman Mendoza (Docente) / Dr. Alfredo Flores (Exp.)", "sala": "Sala por definir" },
        { "dia": "Viernes", "fecha": "16/05/2025", "hora": "Hora por definir", "asignatura": "BLS", "docente": "Dr. Mauricio Manzanarez (Docente) / Dra. Hellen Suazo (Exp.)", "sala": "Sala por definir" },
        { "dia": "Martes", "fecha": "20/05/2025", "hora": "Hora por definir", "asignatura": "ACLS (RCP Teams + Algoritmos)", "docente": "Dr. Yader Altamirano (Docente) / Dr. Jorge Soza (Exp.)", "sala": "Sala por definir" },
        { "dia": "Viernes", "fecha": "23/05/2025", "hora": "Hora por definir", "asignatura": "ACLS (Sistema Nervioso Simpatico y parasimpatico y aparato cardiovascular)", "docente": "Dr. Jose Lopez (Docente) / Dr. Yordan Arauz (Exp.)", "sala": "Sala por definir" },
        { "dia": "Martes", "fecha": "27/05/2025", "hora": "Hora por definir", "asignatura": "ACLS (Vasconstrictores y cronotropos)", "docente": "Dr. Delgado (Docente) / Dr. Alfredo Flores (Exp.)", "sala": "Sala por definir" },
        { "dia": "Jueves", "fecha": "29/05/2025", "hora": "Hora por definir", "asignatura": "ACLS (Marcapaso, Cardioversio, Desfibrilacion)", "docente": "Dr. Vanegas (Docente) / Dra. Hellen Suazo (Exp.)", "sala": "Sala por definir" },

        // Junio 2025
        { "dia": "Lunes", "fecha": "02/06/2025", "hora": "Hora por definir", "asignatura": "Primera evaluacion", "docente": "Evaluación", "sala": "Sala por definir" },
        { "dia": "Martes", "fecha": "03/06/2025", "hora": "Hora por definir", "asignatura": "RCP en situaciones especiales", "docente": "Dr. Berman Mendoza (Docente) / Dr. Jorge Soza (Exp.)", "sala": "Sala por definir" },
        { "dia": "Viernes", "fecha": "06/06/2025", "hora": "Hora por definir", "asignatura": "Cuidados postparada cardiaca", "docente": "Dr. Mauricio Manzanares (Docente) / Dr. Yordan Arauz (Exp.)", "sala": "Sala por definir" },
        { "dia": "Martes", "fecha": "10/06/2025", "hora": "Hora por definir", "asignatura": "Manejo de la via aerea (Planificacion y evaluacion de la via area)", "docente": "Dr. Gustavo Espinoza (Docente) / Dr. Alfredo Flores (Exp.)", "sala": "Sala por definir" },
        { "dia": "Viernes", "fecha": "13/06/2025", "hora": "Hora por definir", "asignatura": "Dispositivo de la via aerea", "docente": "Dr. Yader Altamirano (Docente) / Dra. Hellen Suazo (Exp.)", "sala": "Sala por definir" },
        { "dia": "Martes", "fecha": "17/06/2025", "hora": "Hora por definir", "asignatura": "Laringoscopia y secuencias de intubacion", "docente": "Dr. Jose Lopez (Docente) / Dr. Jorge Soza (Exp.)", "sala": "Sala por definir" },
        { "dia": "Viernes", "fecha": "20/06/2025", "hora": "Hora por definir", "asignatura": "Via aerea quirugica", "docente": "Dr. Mauricio Manzanarez (Docente) / Dr. Yordan Arauz (Exp.)", "sala": "Sala por definir" },
        { "dia": "Martes", "fecha": "24/06/2025", "hora": "Hora por definir", "asignatura": "Segunda evaluacion", "docente": "Evaluación", "sala": "Sala por definir" }
    ];
    // --- FIN: DATOS DEL HORARIO ---

    // Orden de los días de la semana (asegúrate de incluir todos los días que aparecen en tus datos)
    const daysOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    // Función para agrupar clases por día
    const groupClassesByDay = (data) => {
        const grouped = data.reduce((acc, currentClass) => {
            const day = currentClass.dia;
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push(currentClass);
            // Ordenar clases dentro del día por fecha (si se quiere ser explícito)
            // acc[day].sort((a, b) => new Date(a.fecha.split('/').reverse().join('-')) - new Date(b.fecha.split('/').reverse().join('-')));
            return acc;
        }, {});

        // Ordenar los días según daysOrder
        const orderedGrouped = {};
        daysOrder.forEach(day => {
            if (grouped[day]) {
                orderedGrouped[day] = grouped[day];
            }
        });
        return orderedGrouped;
    };

    // Función para renderizar el horario en el acordeón
    const renderSchedule = (data) => {
        const groupedData = groupClassesByDay(data);
        accordionContainer.innerHTML = ''; // Limpiar contenido anterior (incluido spinner)

        if (Object.keys(groupedData).length === 0 && data.length > 0) {
             // Si hay datos originales pero el filtro no arroja resultados
            accordionContainer.innerHTML = `
                <div class="alert alert-warning text-center" role="alert">
                    No se encontraron eventos que coincidan con la búsqueda.
                </div>`;
            return;
        } else if (Object.keys(groupedData).length === 0 && data.length === 0) {
            // Si no hay datos en absoluto (esto no debería pasar con los datos hardcodeados)
             accordionContainer.innerHTML = `
                <div class="alert alert-info text-center" role="alert">
                    No hay eventos programados.
                </div>`;
            return;
        }


        let firstItem = true; // Para abrir el primer día por defecto

        Object.entries(groupedData).forEach(([day, classes]) => {
            const dayId = `day-${day.replace(/[^a-zA-Z0-9]/g, '-')}`; // ID único y seguro para el colapso
            const isShown = firstItem ? 'show' : ''; // Clase para mostrar el primer panel
            const isCollapsed = firstItem ? '' : 'collapsed'; // Clase para el botón

            const accordionItem = `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading-${dayId}">
                        <button class="accordion-button ${isCollapsed}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${dayId}" aria-expanded="${firstItem}" aria-controls="collapse-${dayId}">
                            ${day} <span class="badge bg-secondary ms-2">${classes.length} ${classes.length === 1 ? 'evento' : 'eventos'}</span>
                        </button>
                    </h2>
                    <div id="collapse-${dayId}" class="accordion-collapse collapse ${isShown}" aria-labelledby="heading-${dayId}" data-bs-parent="#scheduleAccordion">
                        <div class="accordion-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-hover schedule-table">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Asignatura / Evento</th>
                                            <th>Docente / Expositor / Detalle</th>
                                            <th>Sala</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${classes.map(cls => `
                                            <tr>
                                                <td>${cls.fecha}</td>
                                                <td>${cls.hora}</td>
                                                <td>${cls.asignatura}</td>
                                                <td>${cls.docente}</td>
                                                <td>${cls.sala}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            accordionContainer.innerHTML += accordionItem;
            firstItem = false; // Solo el primer item debe estar abierto
        });

        // Re-inicializar los componentes de collapse de Bootstrap si es necesario
        // (generalmente no lo es si se usa data-bs-parent)
    };


    // Función para filtrar el horario
    const filterSchedule = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredData = scheduleData.filter(cls =>
            cls.asignatura.toLowerCase().includes(searchTerm) ||
            cls.docente.toLowerCase().includes(searchTerm) ||
            cls.fecha.includes(searchTerm) || // Permitir buscar por fecha también
            cls.dia.toLowerCase().includes(searchTerm) // Permitir buscar por día
        );
        renderSchedule(filteredData);
    };

    // Función para imprimir
    const printSchedule = () => {
        window.print();
    };

    // --- Event Listeners ---
    searchInput.addEventListener('input', filterSchedule);
    printButton.addEventListener('click', printSchedule);

    // --- Inicialización ---
    // Establecer año actual en el footer
    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    // Renderizar el horario inicial con todos los datos
    renderSchedule(scheduleData);

});