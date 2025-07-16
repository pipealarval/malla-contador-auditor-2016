const mallaData = [
  {
    anio: "Año 1",
    semestres: [
      {
        nombre: "Semestre 1",
        ramos: [
          { nombre: "Fundamentos de la Empresa", requisitos: [] },
          { nombre: "Introducción al Derecho", requisitos: [] },
          { nombre: "Introducción al Medio y Ética Profesional", requisitos: [] },
          { nombre: "Matemática Aplicada I", requisitos: [] },
          { nombre: "Técnicas de la Expresión Oral y Escrita", requisitos: [] }
        ]
      },
      {
        nombre: "Semestre 2",
        ramos: [
          { nombre: "Administración", requisitos: [] },
          { nombre: "Contabilidad I", requisitos: [] },
          { nombre: "Derecho Comercial", requisitos: ["Introducción al Derecho"] },
          { nombre: "Metodología de la Investigación", requisitos: [] },
          { nombre: "Tecnología de la Información", requisitos: [] },
          { nombre: "Matemática Aplicada II", requisitos: ["Matemática Aplicada I"] }
        ]
      }
    ]
  },
  {
    anio: "Año 2",
    semestres: [
      {
        nombre: "Semestre 1",
        ramos: [
          { nombre: "Recursos Humanos", requisitos: ["Administración"] },
          { nombre: "Contabilidad II", requisitos: ["Contabilidad I"] },
          { nombre: "Derecho Laboral", requisitos: ["Derecho Comercial"] },
          { nombre: "Sistema de Información Administrativa", requisitos: [] },
          { nombre: "Inglés I", requisitos: [] },
          { nombre: "Matemática Aplicada III", requisitos: ["Matemática Aplicada II"] }
        ]
      },
      {
        nombre: "Semestre 2",
        ramos: [
          { nombre: "Comercialización", requisitos: ["Recursos Humanos"] },
          { nombre: "Contabilidad III", requisitos: ["Contabilidad II"] },
          { nombre: "Economía I", requisitos: [] },
          { nombre: "Inglés II", requisitos: ["Inglés I"] },
          { nombre: "Matemática Aplicada IV", requisitos: ["Matemática Aplicada III"] },
          { nombre: "Tributación I", requisitos: ["Contabilidad II"] }
        ]
      }
    ]
  },
  {
    anio: "Año 3",
    semestres: [
      {
        nombre: "Semestre 1",
        ramos: [
          { nombre: "Auditoría I", requisitos: ["Contabilidad III"] },
          { nombre: "Contabilidad IV", requisitos: ["Contabilidad III"] },
          { nombre: "Economía II", requisitos: ["Economía I"] },
          { nombre: "Estadística", requisitos: ["Matemática Aplicada IV"] },
          { nombre: "Tecnología de la Información Aplicada", requisitos: ["Tecnología de la Información"] },
          { nombre: "Inglés III", requisitos: ["Inglés II"] }
        ]
      },
      {
        nombre: "Semestre 2",
        ramos: [
          { nombre: "Gestión de Operaciones", requisitos: ["Auditoría I"] },
          { nombre: "Contabilidad Aplicada", requisitos: ["Contabilidad IV"] },
          { nombre: "Costos I", requisitos: ["Contabilidad III"] },
          { nombre: "Finanzas I", requisitos: ["Economía II"] },
          { nombre: "Inglés IV", requisitos: ["Inglés III"] },
          { nombre: "Tributación II", requisitos: ["Tributación I"] }
        ]
      }
    ]
  },
  {
    anio: "Año 4",
    semestres: [
      {
        nombre: "Semestre 1",
        ramos: [
          { nombre: "Auditoría II", requisitos: ["Auditoría I"] },
          { nombre: "Control de Gestión", requisitos: ["Contabilidad Aplicada"] },
          { nombre: "Costos II", requisitos: ["Costos I"] },
          { nombre: "Electivo Power BI", requisitos: [] },
          { nombre: "Finanzas II", requisitos: ["Finanzas I"] },
          { nombre: "Planificación Tributaria", requisitos: ["Tributación II"] }
        ]
      },
      {
        nombre: "Semestre 2",
        ramos: [
          { nombre: "Auditoría III", requisitos: ["Auditoría II"] },
          { nombre: "Auditoría de Gestión", requisitos: ["Auditoría II"] },
          { nombre: "Seminario de Integración Profesional", requisitos: ["Auditoría III", "Finanzas II"] },
          { nombre: "Finanzas III", requisitos: ["Finanzas II"] },
          { nombre: "Auditoría Informática", requisitos: ["Tecnología de la Información Aplicada"] },
          { nombre: "Auditoría Tributaria", requisitos: ["Planificación Tributaria"] }
        ]
      }
    ]
  }
];

function crearMalla() {
  const container = document.getElementById("mallaContainer");
  const aprobados = new Set(JSON.parse(localStorage.getItem("ramosAprobados")) || []);

  mallaData.forEach(anioData => {
    const anioDiv = document.createElement("div");
    anioDiv.className = "anio";
    const titulo = document.createElement("h2");
    titulo.textContent = anioData.anio;
    anioDiv.appendChild(titulo);

    anioData.semestres.forEach(sem => {
      const semDiv = document.createElement("div");
      semDiv.className = "semestre";
      const h3 = document.createElement("h3");
      h3.textContent = sem.nombre;
      semDiv.appendChild(h3);

      sem.ramos.forEach(ramo => {
        const div = document.createElement("div");
        div.className = "ramo";
        div.textContent = ramo.nombre;
        div.title = ramo.requisitos.length ? `Requiere: ${ramo.requisitos.join(", ")}` : "Sin requisitos";

        const habilitado = ramo.requisitos.every(req => aprobados.has(req));
        if (aprobados.has(ramo.nombre)) {
          div.classList.add("aprobado");
        } else if (habilitado) {
          div.classList.add("habilitado");
        }

        div.addEventListener("click", () => {
          if (aprobados.has(ramo.nombre)) {
            aprobados.delete(ramo.nombre);
          } else if (habilitado) {
            aprobados.add(ramo.nombre);
          }
          localStorage.setItem("ramosAprobados", JSON.stringify([...aprobados]));
          location.reload();
        });

        semDiv.appendChild(div);
      });

      anioDiv.appendChild(semDiv);
    });

    container.appendChild(anioDiv);
  });
}

document.addEventListener("DOMContentLoaded", crearMalla);
