document.addEventListener ('DOMContentLoaded', () => {
    const addButton = document.querySelector('.target__add-button');
    const popup = document.querySelector('.popup');
    const closeButton = document.querySelector('.popup__close');
    const form = document.querySelector('form');
    const cardContainer = document.querySelector('.targets_container');
    const cardTemplate = document.getElementById('card-template').content;
    const errorName = document.querySelector('.name-error');

    const dateInput = document.querySelector('input[type="date"]');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    setCurrentDate = () => {
        dateInput.value = `${year}-${month}-${day}`;
    };

    setCurrentDate();

    addButton.addEventListener('click', () => {
        popup.classList.add('popup__open')
    });

    closeButton.addEventListener('click', () => {
        popup.classList.remove('popup__open')
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('popup__open')
        };
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameValue = form.name.value;
        const descriptionValue = form.description.value;
        const dateValue = form.date.value;

        if (!nameValue) {
            errorName.textContent = 'Поле не может быть пустым';
            return;
        };

        const newCard = cardTemplate.cloneNode(true);
        const newCardName = newCard.querySelector('.card__title');
        const newCardDescription = newCard.querySelector('.card__description_text');
        const newCardDate = newCard.querySelector('.card__date');

        newCardName.textContent = nameValue;
        newCardDescription.textContent = descriptionValue;

        if (dateValue) {
            newCardDate.textContent = dateValue;
        } else {
            newCardDate.textContent = '';
        }

        cardContainer.appendChild(newCard);

        form.reset();

        popup.classList.remove('popup__open');
        errorName.textContent = '';

        setCurrentDate();
    });

    cardContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__delete-button')) {
            const curCard = e.target.closest('.card');
                if (curCard) {
                    curCard.remove();
                }
        }
    })

});