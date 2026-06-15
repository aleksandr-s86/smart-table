export function initFiltering(elements) {
    console.log('Инициализация фильтрации. Переданные элементы:', elements);
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
        console.log('Обновление индексов. Элементы:', elements);
        console.log('Индексы для заполнения:', indexes);
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name =>{
                const el = document.createElement('option');
                        el.textContent = name;
                        el.value = name;
                        return el;
            }));
        });
    };
    const applyFiltering = (query, state, action) => {
        if(!action) {
            return query;
        }
        if(!action.target) {
            return query;
        }
        console.log('Применение фильтрации. Текущий запрос:', query);
        console.log('Состояние:', state);
        console.log('Действие:', action);
       
        if(!action && !action.target) {
            console.warn('Действие или target отсутствуют');
            return query;
        }

        const element = action.target.closest('.filter-element');
        if(!element) {
            console.warn('Элемент не найден по селектору .filter-element');
            return query;
        }
         // @todo: #4.2 — обработать очистку поля
        if(action && action.name === 'clear') {
            const parent = action.target.closest('.filter-group');
            if(parent) {
                console.log('Найдена группа фильтра:', parent);
                const input = parent.querySelector('input');
                if(input) {
                    input.value = '';
                }
                const fieldName = action.dataset.field;
                if(state.filters && fieldName) {
                    state.filters[fieldName] = '';
                }
            } else {
                console.warn('Группа фильтра не найдена');
            }
            return query;
        }
        
        // @todo: #4.5 — отфильтровать данные используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if(['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })
        
        console.log('Сформированный фильтр:', filter);
        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }
    return {
        updateIndexes,
        applyFiltering
    }   
}