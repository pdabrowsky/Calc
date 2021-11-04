const contentElement = document.querySelector('.content');
const sumElement = document.querySelector('.sum');
let sum = 0;

const rows = [
    {
        value: 0.05,
        inRoll: 50
    },
    {
        value: 0.1,
        inRoll: 50
    },
    {
        value: 0.2,
        inRoll: 50
    },
    {
        value: 0.5,
        inRoll: 50
    },
    {
        value: 1,
        inRoll: 50
    },
    {
        value: 2,
        inRoll: 50
    },
    {
        value: 5,
        inRoll: 50
    },
    {
        value: 10,
        inRoll: 1
    },
    {
        value: 20,
        inRoll: 1
    },
    {
        value: 50,
        inRoll: 1
    },
    {
        value: 100,
        inRoll: 1
    },
    {
        value: 200,
        inRoll: 1
    },
    {
        value: 1,
        inRoll: 1,
        label: 'Other'
    }
];

const state = {
    values: rows.map(() => 0)
};

const add = function (index) {
    state.values[index]++;
    render();
};

const minus = function (index) {
    state.values[index]--;
    render();
};
const clear = function (index) {
    state.values[index] = 0;
    render();
};

const update = function (updateValue, index) {
    updateValue = Number.parseInt(updateValue);

    if (Number.isInteger(updateValue)) {
        state.values[index] = updateValue;
        render();
    }
};

const sumCalc = function () {
    return state.values.reduce((sum, rollCount, index) => {
        return sum + rollCount * rows[index].inRoll * rows[index].value;
    }, 0);
};

const render = function () {
    contentElement.innerHTML = '';

    // document.createElement(element)
    // contentElement.appendChild(row)
    rows.forEach((row, index) => {
        const rowElement = document.createElement('div');
        const valueElement = document.createElement('strong');
        const amoutElement = document.createElement('input');
        const minusButton = document.createElement('button');
        const plusButton = document.createElement('button');
        const clearButton = document.createElement('button');

        valueElement.textContent = row.label ?? row.value;
        //valueElement.appendChild(row.value);
        minusButton.textContent = '-';
        plusButton.textContent = '+';
        clearButton.textContent = 'clear';

        valueElement.classList.add('value');
        amoutElement.value = state.values[index];

        // .reduce()

        rowElement.appendChild(valueElement);
        rowElement.appendChild(amoutElement);
        rowElement.appendChild(minusButton);
        rowElement.appendChild(plusButton);
        rowElement.appendChild(clearButton);

        rowElement.classList.add('rowElement');
        valueElement.classList.add('valueElement');
        amoutElement.classList.add('amoutElement');
        minusButton.classList.add('minusButton');
        plusButton.classList.add('plusButton');
        clearButton.classList.add('clearButton');

        contentElement.appendChild(rowElement);

        plusButton.addEventListener('click', () => {
            add(index);
        });

        minusButton.addEventListener('click', () => {
            minus(index);
        });

        clearButton.addEventListener('click', () => {
            clear(index);
        });

        amoutElement.addEventListener('keyup', (event) => {
            const { value } = event.target;
            update(value, index);
            document.querySelectorAll('.amoutElement')[index].focus();
        });
    });

    const sum = sumCalc();
    sumElement.textContent = `Suma: ${sum}`;
};

render();
