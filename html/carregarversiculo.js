const versiculosUrl = 'versiculos.json';  // Arquivo JSON com as referências dos versículos
const apiUrl = 'https://www.abibliadigital.com.br/api/verses/nvi'; // Endpoint da API da Bíblia Digital
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJNb24gQXVnIDE5IDIwMjQgMjI6Mzg6MzMgR01UKzAwMDAuYmVuZGVybWFzdGVyYmFzczIxQGdtYWlsLmNvbSIsImlhdCI6MTcyNDEwNzExM30.hlxAiMsbTA9HEfjaChcKxJxbf6iQSebSTuA4Q2FxyTk';  // Substitua pelo seu token gerado

async function carregarVersiculos() {
    const response = await fetch(versiculosUrl);
    return response.json();
}

async function obterVersiculoAleatorio() {
    const versiculos = await carregarVersiculos();
    if (versiculos.length === 0) {
        return "Nenhum versículo encontrado.";
    }

    // Seleciona um versículo aleatório
    const versiculo = versiculos[Math.floor(Math.random() * versiculos.length)];

    // Monta a URL para obter o texto do versículo
    const url = `${apiUrl}/${versiculo.book}/${versiculo.chapter}/${versiculo.number}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao obter versículo");
        }

        const data = await response.json();
        return `${data.book.name} ${data.chapter}:${data.number} - ${data.text}`;
    } catch (error) {
        console.error(error);
        return "Erro ao obter versículo.";
    }
}

window.onload = async function () {
    document.getElementById("versiculo").innerText = await obterVersiculoAleatorio();
};