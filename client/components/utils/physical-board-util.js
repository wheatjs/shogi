class PhysicalBoard {

    static createElementWithAttributes(name, attributes) {
        let el = document.createElement(name);

        for (let attr of attributes) {
            if (typeof attr === 'string') 
                el.setAttribute(attr, '');
            else 
                el.setAttribute(Object.keys(attr)[0], attr[Object.keys(attr)[0]]); 
        }

        return el;
    }

    static createColumn(x, y) {
        return PhysicalBoard.createElementWithAttributes('div', ['column', { x: x }, { y: y }]);
    }
    

    static createRow(y) {
        return PhysicalBoard.createElementWithAttributes('div', ['row', { y: y }]);
    }

    static getColumn(row, column, board) {
        let physicalRow = board.querySelectorAll('[row]')[row];
        return physicalRow.querySelectorAll('[column]')[column];
    }

    static getRow(row, board) {
        return board.querySelectorAll('[row]')[row];
    }

}