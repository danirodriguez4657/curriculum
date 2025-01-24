document.addEventListener("DOMContentLoaded", () => {
    const skills = document.querySelectorAll("li");
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.opacity = 1;
            skill.style.transform = "translateY(0) scale(1.05)"; // Añadido el efecto de escala
            skill.style.transition = "transform 0.5s ease, opacity 0.5s ease"; // Añadido suavizado
        }, index * 200); 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    const skillsChart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
            labels: ['Python', 'R', 'SQL', 'Power BI', 'Inglés'], // Etiquetas
            datasets: [{
                label: 'Nivel de habilidad',
                data: [4, 3, 4, 3, 5], // Niveles
                backgroundColor: [
                    '#3498db',
                    '#9b59b6',
                    '#e74c3c',
                    '#2ecc71',
                    '#f1c40f'
                ],
                borderColor: [
                    '#2980b9',
                    '#8e44ad',
                    '#c0392b',
                    '#27ae60',
                    '#f39c12'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(tooltipItem) {
                            return `Nivel: ${tooltipItem.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
});
