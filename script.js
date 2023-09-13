// A função Pager aceita dois parâmetros: tableName (o ID da tabela HTML) e itemsPerPage (quantos itens por página).
function Pager(tableName, itemsPerPage) {
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0; // Número total de páginas
    this.inited = false; // Variável de inicialização

    // A função showRecords exibe os registros da página atual.
    this.showRecords = function (from, to) {
        var rows = document.getElementById(tableName).rows;
        // O loop percorre as linhas da tabela (ignorando o cabeçalho da tabela).
        for (var i = 1; i < rows.length; i++) {
            if (i < from || i > to)
                rows[i].style.display = 'none'; // Oculta as linhas fora do intervalo da página atual.
            else
                rows[i].style.display = ''; // Exibe as linhas dentro do intervalo da página atual.
        }
    }

    // A função showPage exibe uma página específica.
    this.showPage = function (pageNumber) {
        if (!this.inited) {
            alert("not inited");
            return;
        }

        // Atualiza a classe dos botões de página selecionados e não selecionados.
        var oldPageAnchor = document.getElementById('pg' + this.currentPage);
        oldPageAnchor.className = 'pg-normal';

        this.currentPage = pageNumber;
        var newPageAnchor = document.getElementById('pg' + this.currentPage);
        newPageAnchor.className = 'pg-selected';

        var from = (pageNumber - 1) * itemsPerPage + 1;
        var to = from + itemsPerPage - 1;
        this.showRecords(from, to);
    }

    // Funções prev e next para navegar entre as páginas.
    this.prev = function () {
        if (this.currentPage > 1)
            this.showPage(this.currentPage - 1);
    }

    this.next = function () {
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    }

    // A função init calcula o número total de páginas e define a variável inited como true.
    this.init = function () {
        var rows = document.getElementById(tableName).rows;
        var records = (rows.length - 1);
        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    }

    // A função showPageNav exibe os botões de navegação entre as páginas.
    this.showPageNav = function (pagerName, positionId) {
        if (!this.inited) {
            alert("not inited");
            return;
        }
        var element = document.getElementById(positionId);

        var pagerHtml = '<span onclick="' + pagerName + '.prev();"> &#171 </span>';
        for (var page = 1; page <= this.pages; page++)
            pagerHtml += '<span id="pg' + page + '" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span>';
        pagerHtml += '<span onclick="' + pagerName + '.next();"> »</span>';

        element.innerHTML = pagerHtml;
    }
}
